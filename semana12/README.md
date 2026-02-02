# ⚡ VOLT GARAGE - Sistema de Temas Adaptativos

Sistema de diseño visual con **Theme Switcher** funcional, implementado con CSS Variables y JavaScript vanilla.

## 📋 Descripción

Este proyecto demuestra la implementación de un sistema de temas adaptativos profesional para una marca ficticia: **VOLT GARAGE**, un taller de motos eléctricas custom.

### Características

- ✅ **Theme Switcher** funcional (Light/Dark mode)
- ✅ Cambio instantáneo sin recarga de página
- ✅ Persistencia de preferencia en `localStorage`
- ✅ Detección automática de preferencia del sistema (`prefers-color-scheme`)
- ✅ Más de 40 variables CSS organizadas por categoría
- ✅ Todos los colores verificados con WebAIM Contrast Checker
- ✅ Cumplimiento WCAG 2.1 nivel AA/AAA
- ✅ Accesibilidad completa (navegación por teclado)

## 🎨 Paleta de Colores

### Justificación de la Elección

| Color | Valor | Emoción/Propósito |
|-------|-------|-------------------|
| **Primary (Lima)** | `#84CC16` / `#A3E635` | Energía eléctrica, voltaje, innovación |
| **Accent (Cyan)** | `#06B6D4` / `#22D3EE` | Tecnología, precisión, circuitos |
| **Warning (Ámbar)** | `#F59E0B` / `#FBBF24` | Precaución industrial, atención |
| **Error (Rojo)** | `#EF4444` / `#F87171` | Señalización de peligro |

### Verificación de Contraste

| Combinación | Ratio Light | Ratio Dark | Nivel |
|-------------|-------------|------------|-------|
| Texto primario / Fondo | 15.8:1 | 17.4:1 | AAA ✓ |
| Texto sobre Primary Button | 8.5:1 | 10.2:1 | AAA ✓ |
| Texto secundario / Fondo | 4.8:1 | 5.2:1 | AA ✓ |

## 🛠 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS (Custom Properties)
- **JavaScript ES6** - IIFE pattern para encapsulación
- **Google Fonts** - Rajdhani (display) + Barlow (body)

## 📁 Estructura del Proyecto

```
theme-system/
├── index.html              # Demo completa con todos los componentes
├── Justificacion_Temas.pdf # Documento de justificación
├── generate_pdf.py         # Script para generar el PDF
└── README.md               # Este archivo
```

## 🚀 Uso

### Abrir el Demo

Simplemente abre `index.html` en cualquier navegador moderno.

### Cambiar de Tema

1. **Click** en el toggle switch en la navbar
2. **Teclado**: Navega al toggle con Tab y presiona Enter/Space
3. **Automático**: Respeta la preferencia de tu sistema operativo

### Implementar en tu Proyecto

```html
<!-- 1. Estructura HTML -->
<html data-theme="light">

<!-- 2. Variables CSS -->
<style>
:root {
    --primary-500: #84CC16;
    /* ... más variables */
}

[data-theme="dark"] {
    --primary-500: #A3E635;
    /* ... override para dark */
}
</style>

<!-- 3. JavaScript -->
<script>
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}
</script>
```

## 🧩 Componentes Incluidos

- **Navbar** con branding y navegación
- **Hero Section** con gradiente de texto
- **Botones** - 6 variantes + estados (hover, active, disabled)
- **Cards** - Standard y Featured
- **Formularios** - Inputs, selects, checkboxes, radios
- **Alertas** - Success, Info, Warning, Error
- **Badges** - 5 variantes de color
- **Paleta de colores** - Visualización de la paleta

## 📊 Pruebas de Accesibilidad

Los colores fueron verificados usando:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Accessibility Panel

## 📄 Licencia

Proyecto educativo para demostración de sistemas de diseño.

---

Desarrollado como ejercicio de **UI Engineering** - Sistema de Temas
