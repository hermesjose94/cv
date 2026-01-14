# CV Moderno - Hermes Pérez

CV profesional moderno desarrollado con React 18+, TypeScript, Vite y Tailwind CSS. Incluye funcionalidades de multilenguaje (español/inglés) y exportación a PDF.

## 🚀 Características

- ✅ **Diseño Moderno y Responsivo**: Optimizado para desktop, tablet y móvil
- ✅ **Multilenguaje**: Soporte para español e inglés con detección automática
- ✅ **Exportación PDF**: Genera PDF profesional con un clic usando `window.print()`
- ✅ **Gestión Dinámica de Contenido**: Contenido cargado desde archivos JSON
- ✅ **Optimización de Rendimiento**: Lazy loading, code splitting y caching
- ✅ **SEO Optimizado**: Meta tags y datos estructurados
- ✅ **Calidad de Código**: ESLint, Prettier, Husky y lint-staged
- ✅ **Testing Completo**: Vitest + React Testing Library + Property-Based Testing

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript 5.9
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 3
- **Internacionalización**: react-i18next
- **Testing**: Vitest, React Testing Library, fast-check
- **CI/CD**: GitHub Actions
- **Gestión de Paquetes**: pnpm 9

## 📋 Requisitos

- Node.js 22+ (especificado en `.nvmrc`)
- pnpm 9+

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# El sitio estará disponible en http://localhost:5173/
```

### Build

```bash
# Generar build de producción
pnpm build

# Vista previa del build
pnpm preview
```

### Testing

```bash
# Ejecutar tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch
```

### Calidad de Código

```bash
# Ejecutar linter
pnpm lint

# Corregir problemas de linting automáticamente
pnpm lint:fix

# Verificar formato
pnpm format:check

# Formatear código
pnpm format

# Verificar tipos TypeScript
pnpm type-check
```

## 📦 Estructura del Proyecto

```
cv/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD con GitHub Actions
├── public/
│   └── data/
│       ├── data-es.json        # Contenido en español
│       └── data-en.json        # Contenido en inglés
├── src/
│   ├── components/             # Componentes React
│   │   ├── layout/            # Header, Footer, ErrorBoundary
│   │   ├── sections/          # Secciones del CV
│   │   └── ui/                # Componentes UI reutilizables
│   ├── hooks/                 # Custom hooks
│   ├── i18n/                  # Configuración de internacionalización
│   ├── services/              # Servicios (PDF, Content)
│   ├── test/                  # Tests
│   └── types/                 # Tipos TypeScript
├── .nvmrc                     # Versión de Node.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🌐 Despliegue

El proyecto está configurado para despliegue automático en GitHub Pages mediante GitHub Actions.

### Configuración de GitHub Pages (IMPORTANTE)

Para evitar workflows duplicados, debes configurar GitHub Pages correctamente:

1. Ve a la configuración del repositorio en GitHub
2. Navega a **Settings > Pages**
3. En **Source**, selecciona **GitHub Actions** (NO selecciones "Deploy from a branch")
4. Guarda los cambios

Esto deshabilitará el workflow automático de GitHub Pages y solo se ejecutará nuestro workflow personalizado.

### Workflow de CI/CD

El workflow incluye tres jobs:

1. **Validación**: Lint, format check, type-check y tests
2. **Build**: Generación del build de producción
3. **Deploy**: Despliegue automático a GitHub Pages (solo en push a `master` o `main`)

El workflow se ejecuta en:

- **Push a master/main**: Ejecuta validación, build y deploy
- **Pull Request**: Solo ejecuta validación y build (sin deploy)

### URL de Producción

El sitio estará disponible en: `https://hermesjose94.github.io/`

### Solución de Problemas

**Problema: Se ejecutan dos workflows simultáneamente**

Esto ocurre cuando GitHub Pages está configurado en modo "Deploy from a branch". Solución:

1. Ve a **Settings > Pages**
2. Cambia **Source** a **GitHub Actions**
3. Esto deshabilitará el workflow automático de GitHub

**Problema: 404 al cargar archivos**

Verifica que `vite.config.ts` tenga configurado `base: '/'` correctamente.

## 🧪 Testing

El proyecto incluye tres tipos de tests:

### Tests Unitarios

Verifican el comportamiento de componentes individuales y funciones.

### Property-Based Tests

Validan propiedades universales del sistema usando `fast-check`:

- Estructura de datos JSON
- Carga dinámica de contenido
- Persistencia de idioma
- Generación de PDF
- Responsividad
- Interactividad

### Tests de Integración

Verifican la interacción entre múltiples componentes.

## 📝 Gestión de Contenido

El contenido del CV se gestiona mediante archivos JSON en `public/data/`:

- `data-es.json`: Contenido en español
- `data-en.json`: Contenido en inglés

Para actualizar el contenido, simplemente edita estos archivos siguiendo la estructura TypeScript definida en `src/types/cv.types.ts`.

## 🎨 Personalización

### Colores

Los colores principales se pueden modificar en `tailwind.config.js`.

### Estilos de Impresión

Los estilos para PDF se encuentran en `src/app.css` bajo `@media print`.

## 📄 Licencia

Este proyecto es privado y de uso personal.

## 👤 Autor

**Hermes Pérez**

- LinkedIn: [linkedin.com/in/hermes-perez](https://linkedin.com/in/hermes-perez)
- Email: hermes.perez@example.com

---

Desarrollado con ❤️ usando React + TypeScript + Vite
