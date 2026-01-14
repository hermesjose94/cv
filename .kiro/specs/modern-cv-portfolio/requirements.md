# Documento de Requisitos

## Introducción

Sistema de CV dinámico online moderno para Hermes Pérez, desarrollado con tecnologías actuales (React, Vite, Tailwind CSS) y desplegado en GitHub Pages. El sistema debe presentar información profesional de manera atractiva, ser multilenguaje, completamente responsive y permitir descarga en PDF.

## Glosario

- **Sistema_CV**: El sistema completo de curriculum vitae online
- **Sitio_CV**: La aplicación web que presenta el CV
- **Selector_Idioma**: Componente para cambiar entre idiomas
- **Gestor_Contenido**: Sistema para gestionar contenido multilenguaje
- **Exportador_PDF**: Funcionalidad para generar y descargar CV en PDF
- **Diseño_Responsivo**: Diseño que se adapta a diferentes tamaños de pantalla

## Requisitos

### Requisito 1: Arquitectura Moderna y Tecnologías

**Historia de Usuario:** Como desarrollador, quiero usar tecnologías modernas y actuales, para que el proyecto sea mantenible y escalable.

#### Criterios de Aceptación

1. EL Sistema_CV DEBERÁ construirse usando React 18+ con TypeScript
2. EL Sistema_CV DEBERÁ usar Vite como herramienta de construcción y servidor de desarrollo
3. EL Sistema_CV DEBERÁ usar Tailwind CSS para estilos y diseño responsivo
4. EL Sistema_CV DEBERÁ requerir Node.js 22+ como versión mínima
5. EL Sistema_CV DEBERÁ usar pnpm como gestor de paquetes exclusivamente
6. EL Sistema_CV DEBERÁ ser desplegable en GitHub Pages
7. EL Sistema_CV DEBERÁ tener una estructura de proyecto moderna con organización adecuada de componentes

### Requisito 2: Información Personal y Profesional

**Historia de Usuario:** Como visitante del sitio, quiero ver información completa y actualizada sobre Hermes Pérez, para evaluar su perfil profesional.

#### Criterios de Aceptación

1. CUANDO un usuario visita el sitio, EL Sitio_CV DEBERÁ mostrar la información profesional actual de Hermes Pérez
2. EL Sitio_CV DEBERÁ mostrar información de contacto incluyendo ubicación (Bogotá, Colombia), perfil de LinkedIn
3. EL Sitio_CV DEBERÁ mostrar resumen profesional destacando 8+ años de experiencia como Tech Lead
4. EL Sitio_CV DEBERÁ mostrar experiencia laboral completa desde Nelumbo (2017) hasta Jump Cube Technologies (actual)
5. EL Sitio_CV DEBERÁ mostrar habilidades técnicas organizadas por categorías (Frontend, Backend, Nube y DevOps, etc.)
6. EL Sitio_CV DEBERÁ mostrar formación académica (Ingeniería Informática - UNET)

### Requisito 3: Sistema Multilenguaje

**Historia de Usuario:** Como visitante internacional, quiero poder ver el CV en diferentes idiomas, para entender mejor la información presentada.

#### Criterios de Aceptación

1. EL Selector_Idioma DEBERÁ soportar al menos idiomas español e inglés
2. CUANDO un usuario selecciona un idioma, EL Sitio_CV DEBERÁ mostrar todo el contenido en ese idioma
3. EL Gestor_Contenido DEBERÁ almacenar traducciones para todo el contenido de texto
4. CUANDO la página carga, EL Sitio_CV DEBERÁ detectar el idioma del navegador y establecerlo por defecto
5. EL Sitio_CV DEBERÁ mantener la selección de idioma entre recargas de página

### Requisito 4: Funcionalidad de Descarga PDF

**Historia de Usuario:** Como visitante o reclutador, quiero descargar el CV en formato PDF, para guardarlo y revisarlo offline.

#### Criterios de Aceptación

1. EL Exportador_PDF DEBERÁ generar una versión PDF del CV con formato profesional
2. CUANDO un usuario hace clic en descargar, EL Exportador_PDF DEBERÁ crear el PDF en el idioma actual seleccionado
3. EL Exportador_PDF DEBERÁ mantener el diseño y formato visual del CV online
4. EL Exportador_PDF DEBERÁ incluir toda la información visible en la versión web
5. EL Exportador_PDF DEBERÁ generar archivos con nombre descriptivo (ej: "Hermes_Perez_CV_ES.pdf")

### Requisito 5: Diseño Responsivo y Moderno

**Historia de Usuario:** Como visitante usando diferentes dispositivos, quiero que el sitio se vea bien en cualquier pantalla, para tener una buena experiencia de usuario.

#### Criterios de Aceptación

1. EL Sitio_CV DEBERÁ ser completamente responsivo en escritorio, tablet y móvil
2. EL Sitio_CV DEBERÁ usar principios de diseño moderno con tipografía limpia y espaciado adecuado
3. CUANDO se visualiza en dispositivos móviles, EL Sitio_CV DEBERÁ mantener legibilidad y usabilidad
4. EL Sitio_CV DEBERÁ usar un esquema de colores profesional adecuado para un profesional técnico
5. EL Sitio_CV DEBERÁ tener animaciones suaves y transiciones para mejor experiencia de usuario

### Requisito 6: Componentes Interactivos

**Historia de Usuario:** Como visitante, quiero interactuar con elementos del sitio, para explorar la información de manera dinámica.

#### Criterios de Aceptación

1. EL Sitio_CV DEBERÁ tener secciones expandibles para experiencia laboral detallada
2. EL Sitio_CV DEBERÁ incluir barras de habilidades interactivas o indicadores de progreso
3. CUANDO se pasa el cursor sobre tecnologías, EL Sitio_CV DEBERÁ mostrar información adicional o destacados
4. EL Sitio_CV DEBERÁ tener navegación suave entre secciones
5. EL Sitio_CV DEBERÁ incluir botones de contacto con funcionalidad de llamada a la acción

### Requisito 7: Optimización y Rendimiento

**Historia de Usuario:** Como visitante, quiero que el sitio cargue rápidamente, para tener una experiencia fluida.

#### Criterios de Aceptación

1. EL Sitio_CV DEBERÁ cargar en menos de 3 segundos en conexiones estándar de internet
2. EL Sitio_CV DEBERÁ estar optimizado para SEO con meta tags apropiados y datos estructurados
3. EL Sitio_CV DEBERÁ usar carga diferida para imágenes y contenido no crítico
4. EL Sitio_CV DEBERÁ tener estrategias de caché apropiadas para recursos estáticos
5. EL Sitio_CV DEBERÁ lograr puntuaciones altas en auditorías de rendimiento de Lighthouse

### Requisito 8: Despliegue y Hosting

**Historia de Usuario:** Como propietario del CV, quiero que el sitio esté disponible online de manera confiable, para compartir mi perfil profesional.

#### Criterios de Aceptación

1. EL Sistema_CV DEBERÁ ser desplegable en GitHub Pages automáticamente
2. CUANDO se hace push de código a la rama principal, EL Sistema_CV DEBERÁ activar despliegue automático
3. EL Sitio_CV DEBERÁ ser accesible vía dominio personalizado o URL de GitHub Pages
4. EL Sistema_CV DEBERÁ incluir scripts de construcción apropiados para despliegue en producción
5. EL Sitio_CV DEBERÁ tener manejo apropiado de errores para 404 y otros errores HTTP

### Requisito 9: Gestión Dinámica de Contenido

**Historia de Usuario:** Como propietario del CV, quiero poder actualizar mi información fácilmente editando archivos JSON, para mantener el contenido actualizado sin tocar código.

#### Criterios de Aceptación

1. EL Gestor_Contenido DEBERÁ usar dos archivos JSON separados: `data-es.json` y `data-en.json`
2. CUANDO se modifica un archivo JSON (agregar trabajo, skill, etc.), EL Sitio_CV DEBERÁ reflejar cambios automáticamente al reconstruir
3. EL Gestor_Contenido DEBERÁ tener estructura JSON clara y fácil de editar para información personal, experiencia, habilidades y educación
4. EL Gestor_Contenido DEBERÁ validar estructura JSON para prevenir errores de formato
5. EL Sitio_CV DEBERÁ cargar dinámicamente el contenido desde el archivo JSON del idioma seleccionado

### Requisito 10: Estructura de Datos JSON

**Historia de Usuario:** Como propietario del CV, quiero que los archivos JSON tengan una estructura clara y lógica, para poder editarlos fácilmente.

#### Criterios de Aceptación

1. EL archivo JSON DEBERÁ tener secciones claramente definidas: personal, experiencia, habilidades, educación
2. CUANDO se agrega nueva experiencia laboral, EL archivo JSON DEBERÁ permitir agregar un nuevo objeto con campos estándar
3. CUANDO se agregan nuevas habilidades, EL archivo JSON DEBERÁ permitir agregar elementos a arrays de habilidades por categoría
4. EL archivo JSON DEBERÁ incluir metadatos como fecha de última actualización
5. EL archivo JSON DEBERÁ tener comentarios o documentación interna para facilitar edición
