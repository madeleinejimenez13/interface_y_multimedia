# Accesibilidad Cognitiva en Entornos 3D

## Prototipo de Prueba de Concepto (PoC)

Este proyecto implementa un sistema de **reducción de carga cognitiva** en entornos 3D inmersivos, diseñado específicamente para usuarios neurodivergentes (TDAH, TEA, dislexia) y cualquier persona que experimente sobrecarga sensorial en interfaces complejas.

### 🎯 Objetivo

Demostrar técnicamente cómo aplicar los principios de la **Teoría de Carga Cognitiva (CLT)** de John Sweller en entornos WebXR/3D, reduciendo la carga extrínseca y optimizando la presentación de información.

### 🧠 Fundamentos Teóricos

1. **Teoría de Carga Cognitiva (Sweller, 1988)**
   - La memoria de trabajo humana puede procesar solo 4±2 elementos simultáneos
   - Tres tipos de carga: intrínseca, extrínseca y germinal
   - El diseño debe minimizar la carga extrínseca

2. **Trastorno del Procesamiento Sensorial (SPD)**
   - Común en personas con autismo y TDAH
   - Dificultad para filtrar estímulos sensoriales
   - Requiere control sobre la cantidad y tipo de información presentada

### 🛠️ Stack Tecnológico

- **A-Frame 1.4.2**: Framework WebXR basado en Three.js
- **Web Audio API**: Síntesis de audio para feedback auditivo
- **Vibration API**: Feedback háptico en dispositivos compatibles
- **CSS Variables**: Sistema de temas dinámicos
- **Vanilla JavaScript ES6+**: Sin dependencias adicionales

### 📁 Estructura del Proyecto

```
cognitive-accessibility-3d/
├── index.html          # Aplicación principal (HTML + A-Frame + JS)
├── README.md           # Este archivo
└── docs/
    └── technical-document.pdf  # Documento de sustento técnico
```

### 🚀 Instalación y Uso

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/cognitive-accessibility-3d.git
```

2. Servir con cualquier servidor HTTP local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

3. Abrir en navegador: `http://localhost:8000`

### ⚙️ Controles de Accesibilidad

| Control | Función | Impacto en Carga Cognitiva |
|---------|---------|----------------------------|
| Objetos visibles | Reduce elementos en escena | ↓ Carga extrínseca |
| Intensidad de color | Desatura colores | ↓ Estimulación visual |
| Velocidad de animación | Ralentiza/detiene movimiento | ↓ Procesamiento visual |
| Señales de audio | Feedback auditivo | Distribución multimodal |
| Feedback háptico | Vibración táctil | Distribución multimodal |
| Guías visuales | Indicadores de interacción | ↓ Incertidumbre |

### 🎨 Perfiles Predefinidos

- **🧘 Calma**: Mínimos estímulos, ideal para sobrecarga sensorial
- **🎯 Enfoque**: Elementos clave destacados, zona de atención definida
- **👁️ Alto Contraste**: Máxima legibilidad, fondo oscuro
- **↺ Default**: Configuración estándar

### 📊 Indicador de Carga Cognitiva

El sistema calcula una estimación de la carga cognitiva basándose en:

```javascript
carga = (objetos × 0.3) + (color × 0.15) + (animación × 0.2) 
        + (desviación_luz × 0.1) - (asistencia_multimodal × 0.25)
```

### 🔬 Métricas Evaluadas

- **Carga Extrínseca**: Elementos visuales no esenciales
- **Distribución Modal**: Balance entre canales visual/auditivo/háptico
- **Predictibilidad**: Consistencia en interacciones
- **Control del Usuario**: Capacidad de personalización

### 📝 Licencia

MIT License - Uso libre para fines educativos y comerciales.

### 👤 Autor

Desarrollado como proyecto de experimentación técnica para el curso de Interfaces Emergentes.

---

**Nota**: Este prototipo es una demostración técnica. Para implementación en producción, considere realizar pruebas de usabilidad con usuarios neurodivergentes reales.
