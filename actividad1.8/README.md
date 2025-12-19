# Escena 3D Interactiva con Three.js

## Descripción del Proyecto

Este proyecto implementa una **composición 3D interactiva** que simula un sistema planetario abstracto con múltiples objetos geométricos en órbita. La escena está construida utilizando la biblioteca Three.js y presenta una animación fluida con iluminación profesional que resalta el volumen y la profundidad de cada elemento.

## Estructura de la Composición

La escena está compuesta por cuatro elementos geométricos principales:

1. **Esfera Central**: Actúa como el planeta principal del sistema, con rotación constante en múltiples ejes
2. **Torus Orbital**: Un anillo que rodea la esfera, rotando en su propio eje
3. **Icosaedro Satélite**: Un poliedro de 20 caras que orbita alrededor del sistema
4. **Dodecaedro Secundario**: Un segundo satélite que orbita en dirección contraria

## Materiales Utilizados

He implementado dos tipos de materiales que reaccionan a la iluminación:

- **MeshStandardMaterial**: Utilizado en la esfera, el torus y el icosaedro. Este material es basado en física (PBR) y responde de manera realista a la luz mediante propiedades de `metalness` (metalicidad) y `roughness` (rugosidad). Cada objeto tiene valores diferentes para crear variedad visual.

- **MeshPhongMaterial**: Aplicado al dodecaedro para demostrar un modelo de iluminación alternativo con especularidad controlada mediante la propiedad `shininess`.

Todos los materiales incluyen propiedades `emissive` que les dan un brillo sutil propio, creando un efecto visual más impactante.

## Sistema de Iluminación

La escena implementa un **esquema de iluminación mixto** de tres capas:

1. **Luz Ambiental (AmbientLight)**: Proporciona una iluminación base suave de color gris oscuro para asegurar que ningún objeto quede completamente negro

2. **Luz Direccional (DirectionalLight)**: Simula una fuente de luz distante (como el sol) que proyecta sombras definidas y crea el efecto de volumen principal en los objetos

3. **Luces Puntuales (PointLight)**: Dos luces de colores (cian y rosa) posicionadas estratégicamente que añaden acentos de color y profundidad adicional. Estas luces tienen intensidad animada para crear un efecto pulsante sutil

## Configuración de la Cámara

La cámara está configurada con:
- Campo de visión (FOV) de **60 grados** para una perspectiva más cinematográfica
- Posición en `(8, 6, 12)` que proporciona un ángulo elevado y distante de la escena
- La cámara apunta hacia el origen `(0, 0, 0)` donde se concentra la acción

## Animación

El sistema de animación utiliza `requestAnimationFrame` para crear movimientos fluidos:

- La esfera central rota en los ejes X e Y a diferentes velocidades
- El torus gira sobre sus ejes Z e Y
- Los satélites orbitan alrededor del centro usando funciones trigonométricas (seno y coseno) con diferentes frecuencias y radios
- Las luces puntuales pulsan sutilmente para añadir dinamismo

## Tecnologías

- **Three.js r128**: Biblioteca principal para renderizado 3D
- **HTML5 Canvas**: Elemento donde se renderiza la escena
- **JavaScript ES6**: Lógica de la aplicación
- **CSS3**: Estilos y diseño de la interfaz

## Cómo Ejecutar

1. Clona este repositorio
2. Abre el archivo `index.html` en tu navegador web moderno
3. La escena se cargará y comenzará la animación automáticamente

No se requiere instalación de dependencias ya que Three.js se carga desde CDN.

## Autor

[Tu Nombre]
[Tu Universidad/Institución]