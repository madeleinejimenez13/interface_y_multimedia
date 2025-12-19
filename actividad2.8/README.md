# Sistema de Partículas Interactivo - HTML5 Canvas

## 📋 Descripción del Proyecto

Este proyecto implementa un **sistema de partículas interactivo** utilizando la API nativa de HTML5 Canvas y JavaScript puro (Vanilla JS). El sistema simula física básica con gravedad, fricción, colisiones y múltiples tipos de interacción con el usuario.

## 🎯 Características Principales

### Sistema de Partículas
- **80 partículas iniciales** generadas en posiciones aleatorias
- Cada partícula es un objeto independiente con propiedades físicas únicas
- Movimiento autónomo con velocidades aleatorias
- Colisión y rebote en los bordes del canvas
- Sistema de colores HSL con variación dinámica

### Física Implementada
- **Gravedad**: Aceleración constante hacia abajo (0.15 unidades por frame)
- **Fricción del aire**: Factor de 0.98 que reduce gradualmente la velocidad
- **Rebote**: Factor de 0.7 al colisionar con los bordes
- **Colisión con bordes**: Detección matemática precisa usando el teorema de Pitágoras

### Interacciones del Usuario

#### 1️⃣ Repulsión por Proximidad (Movimiento del Mouse)
**Cómo probarlo:** Mueve el mouse dentro del canvas

**Lógica matemática:**
- Calcula la distancia euclidiana entre cada partícula y el cursor: `distancia = √((x₂-x₁)² + (y₂-y₁)²)`
- Si la distancia < 150 píxeles, aplica fuerza de repulsión
- La fuerza es inversamente proporcional a la distancia: `fuerza = (radioRepulsión - distancia) / radioRepulsión`
- Calcula el ángulo de repulsión: `ángulo = atan2(dy, dx)`
- Aplica componentes vectoriales: `velocidadX += cos(ángulo) × fuerza` y `velocidadY += sen(ángulo) × fuerza`

**Efectos visuales:**
- Las partículas aumentan de tamaño (hasta 1.5x su tamaño original)
- El color cambia gradualmente rotando el matiz en el espacio HSL
- Se crea un efecto de "oleada" cuando mueves el mouse rápidamente

#### 2️⃣ Colisión Directa (Toque del Cursor)
**Cómo probarlo:** Pasa el cursor directamente sobre las partículas

**Lógica matemática:**
- Detecta colisión cuando la distancia < 20 píxeles
- Aplica cambio de color complementario: `nuevoMatiz = (matizActual + 180) % 360`
- Genera impulso fuerte en dirección opuesta al cursor
- Velocidad de impulso: 5 unidades (mucho mayor que la repulsión normal)

**Efectos visuales:**
- Cambio drástico de color a su complementario
- Saturación máxima (100%)
- Las partículas "saltan" dramáticamente al ser tocadas

#### 3️⃣ Generación con Clic
**Cómo probarlo:** Haz clic en cualquier parte del canvas

**Lógica matemática:**
- Genera 10 nuevas partículas en la posición del clic
- Cada partícula tiene una posición inicial con variación aleatoria: `x = clickX + (random × 20 - 10)`
- Las partículas generadas tienen **gravedad activada** por defecto
- Velocidad inicial mayor que las partículas del sistema base

**Efectos visuales:**
- Las partículas caen naturalmente debido a la gravedad
- Rebotan al tocar el suelo
- Eventualmente se estabilizan (velocidad < 0.5)

## 🎮 Controles Interactivos

### Botones de Control
1. **Reiniciar Sistema**: Elimina todas las partículas y regenera 80 nuevas
2. **Gravedad ON/OFF**: Activa/desactiva la gravedad para todas las partículas
3. **Repulsión ON/OFF**: Activa/desactiva el efecto de repulsión del mouse

## 🔧 Aspectos Técnicos

### Estructura de Clases
El proyecto utiliza **programación orientada a objetos** con una clase `Particle`:
```javascript
class Particle {
    constructor(x, y, withGravity)
    update()              // Actualiza física y posición
    applyRepulsion()      // Calcula y aplica fuerzas de repulsión
    draw()                // Renderiza la partícula en el canvas
    updateColor()         // Actualiza el color HSL
}
```

### Bucle de Animación
- Utiliza **exclusivamente `requestAnimationFrame`** (no `setInterval`)
- Renderiza aproximadamente 60 frames por segundo
- Optimizado para evitar bloqueo del hilo principal

### Efecto Visual de Estela
En lugar de limpiar completamente el canvas en cada frame, se dibuja un rectángulo semi-transparente:
```javascript
ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
```
Esto crea un **efecto de motion blur** donde las partículas dejan un rastro visual.

### Responsive Design
El canvas se ajusta automáticamente al redimensionar la ventana:
- Escucha el evento `window.resize`
- Recalcula dimensiones: 90% del ancho y 80% del alto de la ventana
- Mantiene las partículas dentro de los nuevos límites

## 📊 Optimizaciones

1. **Eliminación automática de partículas**: Las partículas que están inmóviles en el suelo tienen 1% de probabilidad por frame de ser eliminadas (solo si hay más de 50 partículas)

2. **Detección eficiente de colisiones**: Se calcula la distancia una sola vez y se reutiliza para todas las comprobaciones

3. **Reducción gradual de tamaño**: Las partículas que aumentaron de tamaño reducen gradualmente a su tamaño original (0.2 píxeles por frame)

## 🚀 Cómo Ejecutar

1. Clona este repositorio:
```bash
git clone [URL-de-tu-repositorio]
```

2. Abre el archivo `index.html` en tu navegador web moderno

3. No se requiere servidor web ni instalación de dependencias

## 🧪 Experimentos Sugeridos

- **Mueve el mouse en círculos**: Observa cómo las partículas crean patrones orbitales
- **Haz clic repetidamente en el mismo lugar**: Crea una "fuente" de partículas
- **Desactiva la gravedad y mueve el mouse rápido**: Observa patrones caóticos
- **Haz clic cerca de los bordes**: Ve cómo las partículas rebotan inmediatamente

## 🎨 Tecnologías Utilizadas

- **HTML5 Canvas API**: Renderizado 2D
- **JavaScript ES6**: Clases, arrow functions, destructuring
- **CSS3**: Gradientes, blur effects, posicionamiento absoluto
- **Matemáticas**: Trigonometría (sin, cos, atan2), teorema de Pitágoras, vectores

## 👨‍💻 Autor

Madeleine Jimenez 
UIDE
19/12/2025

## 📝 Notas de Desarrollo

Este proyecto fue desarrollado completamente con JavaScript nativo sin frameworks ni librerías externas. Toda la lógica de física, colisiones y renderizado fue implementada desde cero utilizando únicamente la API de Canvas 2D.

---

**Nota**: Este proyecto cumple con todos los requisitos de la práctica de Programación Gráfica y Eventos de Usuario en HTML5 Canvas.