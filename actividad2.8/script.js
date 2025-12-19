// ============================================
// CONFIGURACIÓN DEL CANVAS
// ============================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particleCountDisplay = document.getElementById('particle-count');

// Variables globales para dimensiones del canvas
let canvasWidth, canvasHeight;

/**
 * Función para ajustar el tamaño del canvas
 * Se ejecuta al cargar y cada vez que se redimensiona la ventana
 */
function resizeCanvas() {
    // El canvas ocupará el 90% del ancho y 80% del alto de la ventana
    canvasWidth = window.innerWidth * 0.9;
    canvasHeight = window.innerHeight * 0.8;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// Ejecutar al cargar la página
resizeCanvas();

// Escuchar evento de redimensionamiento de ventana
window.addEventListener('resize', resizeCanvas);

// ============================================
// CLASE PARTÍCULA
// ============================================

/**
 * Clase que define cada partícula del sistema
 * Cada partícula es un objeto independiente con propiedades físicas
 */
class Particle {
    /**
     * Constructor de la partícula
     * @param {number} x - Posición inicial en el eje X
     * @param {number} y - Posición inicial en el eje Y
     * @param {boolean} withGravity - Si la partícula debe tener gravedad
     */
    constructor(x, y, withGravity = false) {
        // Posición de la partícula
        this.x = x;
        this.y = y;

        // Velocidad inicial aleatoria (componentes X e Y)
        // Math.random() * 4 - 2 genera números entre -2 y 2
        this.velocityX = (Math.random() * 4 - 2) * (withGravity ? 2 : 1);
        this.velocityY = (Math.random() * 4 - 2) * (withGravity ? 0.5 : 1);

        // Tamaño aleatorio entre 3 y 12 píxeles
        this.size = Math.random() * 9 + 3;

        // Color inicial aleatorio usando HSL (matiz, saturación, luminosidad)
        this.hue = Math.random() * 360;
        this.saturation = 70 + Math.random() * 30;
        this.lightness = 50 + Math.random() * 20;
        this.updateColor();

        // Propiedades de física
        this.friction = 0.98; // Reduce la velocidad gradualmente (simula fricción del aire)
        this.gravity = withGravity ? 0.15 : 0; // Aceleración hacia abajo
        this.bounce = 0.7; // Factor de rebote al chocar con los bordes

        // Estado de interacción
        this.isNearMouse = false;
        this.originalSize = this.size;
    }

    /**
     * Actualiza el color de la partícula basado en sus propiedades HSL
     */
    updateColor() {
        this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }

    /**
     * Actualiza la posición y física de la partícula
     * Esta función se ejecuta en cada frame de animación
     */
    update() {
        // Aplicar gravedad (aumenta velocidad en Y)
        this.velocityY += this.gravity;

        // Aplicar fricción para que las partículas se desaceleren
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        // Actualizar posición basada en la velocidad
        this.x += this.velocityX;
        this.y += this.velocityY;

        // ============================================
        // DETECCIÓN DE COLISIÓN CON BORDES
        // ============================================

        // Borde derecho: si la partícula sale por la derecha
        if (this.x + this.size > canvasWidth) {
            this.x = canvasWidth - this.size;
            this.velocityX *= -this.bounce; // Invierte dirección con rebote
        }

        // Borde izquierdo: si la partícula sale por la izquierda
        if (this.x - this.size < 0) {
            this.x = this.size;
            this.velocityX *= -this.bounce;
        }

        // Borde inferior: si la partícula sale por abajo
        if (this.y + this.size > canvasHeight) {
            this.y = canvasHeight - this.size;
            this.velocityY *= -this.bounce;
            
            // Si la velocidad es muy baja, detener el rebote
            if (Math.abs(this.velocityY) < 0.5) {
                this.velocityY = 0;
            }
        }

        // Borde superior: si la partícula sale por arriba
        if (this.y - this.size < 0) {
            this.y = this.size;
            this.velocityY *= -this.bounce;
        }

        // Restaurar tamaño si no está cerca del mouse
        if (!this.isNearMouse && this.size > this.originalSize) {
            this.size -= 0.2;
        }
    }

    /**
     * Aplica fuerza de repulsión cuando el mouse está cerca
     * @param {number} mouseX - Posición X del mouse
     * @param {number} mouseY - Posición Y del mouse
     */
    applyRepulsion(mouseX, mouseY) {
        if (!settings.repulsionEnabled) return;

        // Calcular distancia entre la partícula y el mouse
        // Usando el teorema de Pitágoras: distancia = √((x2-x1)² + (y2-y1)²)
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Radio de influencia del mouse
        const repulsionRadius = 150;

        // Si la partícula está dentro del radio de repulsión
        if (distance < repulsionRadius) {
            this.isNearMouse = true;

            // Calcular fuerza de repulsión (inversamente proporcional a la distancia)
            // Cuanto más cerca, más fuerte la repulsión
            const force = (repulsionRadius - distance) / repulsionRadius;
            
            // Normalizar el vector de dirección (dx, dy)
            // y aplicar la fuerza de repulsión
            const angle = Math.atan2(dy, dx);
            const repulsionForce = force * 2;

            // Aplicar fuerza en la dirección opuesta al mouse
            this.velocityX += Math.cos(angle) * repulsionForce;
            this.velocityY += Math.sin(angle) * repulsionForce;

            // Cambiar color gradualmente (efecto visual de interacción)
            this.hue = (this.hue + 2) % 360;
            this.updateColor();

            // Aumentar tamaño temporalmente
            if (this.size < this.originalSize * 1.5) {
                this.size += 0.3;
            }
        } else {
            this.isNearMouse = false;
        }

        // ============================================
        // DETECCIÓN DE COLISIÓN DIRECTA CON EL CURSOR
        // ============================================
        
        // Radio de colisión: si el mouse toca la partícula
        const collisionRadius = 20;
        if (distance < collisionRadius) {
            // Cambio drástico de color al colisionar
            this.hue = (this.hue + 180) % 360; // Cambio a color complementario
            this.saturation = 100;
            this.lightness = 60;
            this.updateColor();

            // Impulso fuerte al colisionar
            const angle = Math.atan2(dy, dx);
            this.velocityX += Math.cos(angle) * 5;
            this.velocityY += Math.sin(angle) * 5;
        }
    }

    /**
     * Dibuja la partícula en el canvas
     */
    draw() {
        ctx.save();
        
        // Sombra para dar profundidad
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        // Dibujar la partícula como un círculo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Borde con transparencia
        ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
}

// ============================================
// SISTEMA DE PARTÍCULAS Y CONFIGURACIÓN
// ============================================

// Array que almacenará todas las partículas
let particles = [];

// Posición del mouse
let mouseX = 0;
let mouseY = 0;
let mouseActive = false;

// Configuración del sistema
const settings = {
    gravityEnabled: true,
    repulsionEnabled: true
};

/**
 * Genera el sistema inicial de partículas
 * @param {number} count - Número de partículas a generar
 */
function initParticles(count = 80) {
    particles = [];
    
    for (let i = 0; i < count; i++) {
        // Posición aleatoria dentro del canvas
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        
        // Crear partícula sin gravedad inicial
        particles.push(new Particle(x, y, false));
    }

    updateParticleCount();
}

/**
 * Actualiza el contador de partículas en la pantalla
 */
function updateParticleCount() {
    particleCountDisplay.textContent = `Partículas: ${particles.length}`;
}

// ============================================
// EVENTOS DE MOUSE
// ============================================

/**
 * Actualiza la posición del mouse
 */
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseActive = true;
});

/**
 * Marca cuando el mouse sale del canvas
 */
canvas.addEventListener('mouseleave', () => {
    mouseActive = false;
});

/**
 * Genera nuevas partículas al hacer clic
 * Estas partículas tienen gravedad activada
 */
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Generar 10 partículas en la posición del clic
    for (let i = 0; i < 10; i++) {
        // Pequeña variación en la posición para que no salgan todas del mismo punto
        const x = clickX + (Math.random() * 20 - 10);
        const y = clickY + (Math.random() * 20 - 10);
        
        // Crear partícula con gravedad
        particles.push(new Particle(x, y, settings.gravityEnabled));
    }

    updateParticleCount();
});

// ============================================
// CONTROLES DE BOTONES
// ============================================

document.getElementById('reset-btn').addEventListener('click', () => {
    initParticles(80);
});

document.getElementById('gravity-btn').addEventListener('click', function() {
    settings.gravityEnabled = !settings.gravityEnabled;
    this.textContent = `Gravedad: ${settings.gravityEnabled ? 'ON' : 'OFF'}`;
    
    // Actualizar gravedad de todas las partículas
    particles.forEach(p => {
        p.gravity = settings.gravityEnabled ? 0.15 : 0;
    });
});

document.getElementById('repulsion-btn').addEventListener('click', function() {
    settings.repulsionEnabled = !settings.repulsionEnabled;
    this.textContent = `Repulsión: ${settings.repulsionEnabled ? 'ON' : 'OFF'}`;
});

// ============================================
// BUCLE DE ANIMACIÓN
// ============================================

/**
 * Función principal de animación
 * Se ejecuta continuamente usando requestAnimationFrame
 */
function animate() {
    // Limpiar el canvas con un efecto de estela (trail effect)
    // En lugar de limpiar completamente, dibujamos un rectángulo semi-transparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Actualizar y dibujar cada partícula
    particles.forEach((particle, index) => {
        // Si el mouse está activo, aplicar repulsión
        if (mouseActive) {
            particle.applyRepulsion(mouseX, mouseY);
        }

        // Actualizar física de la partícula
        particle.update();

        // Dibujar la partícula
        particle.draw();

        // Eliminar partículas que están muy quietas y en el suelo
        // para evitar acumulación infinita
        if (particle.y >= canvasHeight - particle.size - 1 &&
            Math.abs(particle.velocityY) < 0.1 &&
            Math.abs(particle.velocityX) < 0.1 &&
            particles.length > 50) {
            
            // Solo eliminar si hay más de 50 partículas
            if (Math.random() < 0.01) { // 1% de probabilidad por frame
                particles.splice(index, 1);
                updateParticleCount();
            }
        }
    });

    // Solicitar el siguiente frame de animación
    // Esto crea un bucle infinito optimizado para renderizado
    requestAnimationFrame(animate);
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Generar las partículas iniciales
initParticles(80);

// Iniciar el bucle de animación
animate();