# Admin Dashboard - Panel Administrativo con Angular Material

![Angular](https://img.shields.io/badge/Angular-19.0-red)
![Material Design](https://img.shields.io/badge/Material%20Design-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)

Panel administrativo profesional construido con **Angular 19** y **Angular Material**, implementando las mejores prácticas de diseño y desarrollo frontend.

## 🎨 Tema de Colores Personalizado

Este proyecto NO utiliza el tema por defecto de Material Design. He configurado un tema personalizado con:

- **Color Primario**: Deep Purple (Púrpura Oscuro - #673AB7)
- **Color Acento**: Amber (Ámbar - #FFA726)
- **Color de Advertencia**: Red (Rojo - #F44336)
- **Tipografía**: Roboto con pesos personalizados (300, 400, 500, 700)

La configuración del tema se encuentra en `src/styles.scss`, donde he definido paletas personalizadas utilizando la función `mat.define-palette()` de Material y aplicado tipografías específicas para diferentes niveles de encabezados.

## 📋 Características Implementadas

### 1. **Layout de Navegación Responsivo**
- ✅ `MatSidenav` para menú lateral
- ✅ `MatToolbar` para cabecera superior
- ✅ Comportamiento adaptativo móvil/escritorio
- ✅ Menú se superpone en móvil (`mode="over"`)
- ✅ Menú lateral fijo en escritorio (`mode="side"`)
- ✅ Cierre automático del menú en móvil tras hacer clic

### 2. **Formulario de Registro de Usuarios**
- ✅ `MatFormField` y `MatInput` para todos los campos
- ✅ `MatSelect` para selección de roles
- ✅ `MatDatepicker` con validación de edad (18+)
- ✅ Validaciones en tiempo real:
  - Campos requeridos
  - Email válido
  - Teléfono de 10 dígitos
  - Longitud mínima de caracteres
- ✅ Botón "Guardar" deshabilitado cuando el formulario es inválido
- ✅ Mensajes de error personalizados
- ✅ Feedback visual con `MatSnackBar`

### 3. **Tabla de Usuarios con Diálogos**
- ✅ `MatTable` con datos ficticios
- ✅ Columnas responsivas (ocultas en móvil)
- ✅ Botones de acción por fila (Ver/Eliminar)
- ✅ `MatDialog` para:
  - Ver detalles del usuario
  - Confirmación de eliminación
- ✅ Paso de datos entre componentes mediante `MAT_DIALOG_DATA`
- ✅ Chips de Material para roles y estados

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

### Pasos para ejecutar

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio-url>
cd admin-dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm start
# o
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

La aplicación se recargará automáticamente si modificas algún archivo fuente.

## 📁 Estructura del Proyecto

```
admin-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── confirm-dialog/          # Componente de diálogo reutilizable
│   │   ├── views/
│   │   │   ├── dashboard/               # Vista principal del dashboard
│   │   │   ├── user-register/           # Formulario de registro
│   │   │   └── user-list/               # Lista de usuarios con tabla
│   │   ├── app.component.ts             # Componente raíz con layout
│   │   ├── app.routes.ts                # Configuración de rutas
│   │   └── app.config.ts                # Configuración de la app
│   ├── styles.scss                      # Tema personalizado de Material
│   └── index.html
├── angular.json                         # Configuración de Angular CLI
├── package.json                         # Dependencias del proyecto
└── README.md
```

## 🎯 Módulos de Angular Material Utilizados

### Componentes Principales
- `MatSidenavModule` - Menú lateral
- `MatToolbarModule` - Barra de herramientas
- `MatButtonModule` - Botones
- `MatIconModule` - Iconos de Material
- `MatListModule` - Listas de navegación
- `MatMenuModule` - Menú desplegable
- `MatBadgeModule` - Insignias de notificación

### Formularios
- `MatFormFieldModule` - Campos de formulario
- `MatInputModule` - Inputs de texto
- `MatSelectModule` - Selectores desplegables
- `MatDatepickerModule` - Selector de fechas
- **IMPORTANTE**: `provideNativeDateAdapter()` - **Necesario para que el DatePicker funcione**

### Tablas y Diálogos
- `MatTableModule` - Tablas de datos
- `MatDialogModule` - Ventanas modales
- `MatChipsModule` - Chips para etiquetas
- `MatTooltipModule` - Tooltips informativos

### Feedback
- `MatSnackBarModule` - Notificaciones toast

### Layout
- `BreakpointObserver` (CDK) - Detección de tamaño de pantalla

## 💡 Desafíos Encontrados y Soluciones

### Desafío Principal: MatDatepicker y el Módulo de Fechas

**Problema**: Al intentar usar `MatDatepicker`, Angular lanzaba un error indicando que no encontraba un adaptador de fechas.

**Causa**: Material Design no incluye por defecto un sistema de manejo de fechas. Es necesario proveer un adaptador explícitamente.

**Solución Implementada**:
```typescript
// En app.config.ts
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    provideNativeDateAdapter() // ← Esto es CRÍTICO para DatePicker
  ]
};
```

**Alternativas disponibles**:
- `@angular/material-moment-adapter` - Para usar Moment.js
- `@angular/material-luxon-adapter` - Para usar Luxon
- Adaptadores personalizados

### Otros Aprendizajes

1. **Componentes Standalone**: Angular 19 favorece componentes standalone sobre módulos NgModule tradicionales, simplificando la arquitectura.

2. **Imports Explícitos**: Cada módulo de Material debe importarse explícitamente en el componente que lo usa, lo que puede generar errores si olvidas alguno.

3. **Inyección de Datos en Diálogos**: El uso de `MAT_DIALOG_DATA` permite pasar datos de forma type-safe entre componente padre y diálogo.

4. **Responsive con CDK**: El `BreakpointObserver` de CDK es esencial para crear layouts verdaderamente responsivos sin CSS media queries complejas.

## 📱 Características Responsivas

- **Desktop (>768px)**: Menú lateral fijo, todas las columnas visibles
- **Tablet/Mobile (<768px)**: 
  - Menú lateral superpuesto
  - Columnas de tabla optimizadas
  - Botones de acción apilados verticalmente

## 🎨 Personalización del Tema

Para cambiar el tema de colores, edita `src/styles.scss`:

```scss
// Cambiar paleta primaria
$admin-primary: mat.define-palette(mat.$tu-color-palette);

// Cambiar paleta de acento
$admin-accent: mat.define-palette(mat.$tu-color-palette);
```

Paletas disponibles en Material: `$red-palette`, `$pink-palette`, `$purple-palette`, `$deep-purple-palette`, `$indigo-palette`, `$blue-palette`, `$light-blue-palette`, `$cyan-palette`, `$teal-palette`, `$green-palette`, `$light-green-palette`, `$lime-palette`, `$yellow-palette`, `$amber-palette`, `$orange-palette`, `$deep-orange-palette`.

## 👨‍💻 Autor

Proyecto desarrollado como parte del taller de Angular Material.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
