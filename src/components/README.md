# Estructura de Componentes

Esta carpeta contiene todos los componentes React organizados por categorías para mantener una arquitectura limpia y escalable.

## 📁 Estructura de Carpetas

### `/layout`

Componentes relacionados con el diseño y estructura general de la aplicación:

- **Header.tsx** - Cabecera con navegación y selector de idioma
- **Footer.tsx** - Pie de página con información de contacto
- **Layout.tsx** - Componente principal de layout que envuelve toda la aplicación
- **ErrorBoundary.tsx** - Manejo de errores de React

### `/sections`

Componentes que representan las diferentes secciones del CV:

- **PersonalInfo.tsx** - Información personal (nombre, título, ubicación, contacto)
- **ProfessionalSummary.tsx** - Resumen profesional
- **WorkExperience.tsx** - Experiencia laboral con secciones expandibles
- **TechnicalSkills.tsx** - Habilidades técnicas con barras de progreso interactivas
- **Education.tsx** - Formación académica
- **Contact.tsx** - Sección de contacto con enlaces funcionales

### `/ui`

Componentes de interfaz de usuario reutilizables:

- **LanguageSwitcher.tsx** - Selector de idioma (español/inglés)

### `/common`

Componentes comunes y utilitarios (actualmente vacía, preparada para futuros componentes)

## 🔄 Importaciones

Cada carpeta tiene su propio archivo `index.ts` que exporta todos los componentes, permitiendo importaciones limpias:

```typescript
// ✅ Importación limpia desde el índice principal
import { Layout, PersonalInfo, TechnicalSkills } from '../components';

// ✅ Importación específica por categoría
import { Header, Footer } from '../components/layout';
import { PersonalInfo, WorkExperience } from '../components/sections';
import { LanguageSwitcher } from '../components/ui';
```

## 🎯 Características

- **Modularidad**: Cada componente tiene una responsabilidad específica
- **Reutilización**: Componentes diseñados para ser reutilizables
- **Tipado**: Todos los componentes están completamente tipados con TypeScript
- **Internacionalización**: Soporte completo para español e inglés
- **Responsive**: Diseño adaptativo para desktop, tablet y móvil
- **Accesibilidad**: Implementación de mejores prácticas de accesibilidad
- **Testing**: Cobertura completa de tests unitarios

## 🧪 Testing

Los componentes están probados en:

- `src/test/components.test.tsx` - Tests de componentes de secciones
- `src/test/layout.test.tsx` - Tests de componentes de layout

## 🎨 Estilos

Todos los componentes utilizan Tailwind CSS para un diseño consistente y mantenible.
