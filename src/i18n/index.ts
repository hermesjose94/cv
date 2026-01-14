import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  es: {
    translation: {
      // Navigation
      nav: {
        about: 'Acerca de',
        experience: 'Experiencia',
        skills: 'Habilidades',
        education: 'Educación',
        contact: 'Contacto',
      },
      // Actions
      actions: {
        downloadPDF: 'Descargar PDF',
        viewMore: 'Ver más',
        viewLess: 'Ver menos',
        contact: 'Contactar',
        interestedCollaborate: '¿Interesado en colaborar? ¡Contáctame!',
        switchLanguage: 'Switch to English',
        copied: 'Copiado',
        emailCopied: 'Email copiado al portapapeles',
      },
      // Labels
      labels: {
        location: 'Ubicación',
        email: 'Correo',
        linkedin: 'LinkedIn',
        phone: 'Teléfono',
        present: 'Actualidad',
        years: 'años',
        year: 'año',
        months: 'meses',
        month: 'mes',
        remote: 'Remoto',
        level: 'Nivel',
        lastUpdated: 'Última actualización',
        language: 'Idioma',
        selectSection: 'Seleccionar sección',
      },
      // Sections
      sections: {
        personalInfo: 'Información Personal',
        professionalSummary: 'Resumen Profesional',
        workExperience: 'Experiencia Laboral',
        technicalSkills: 'Habilidades Técnicas',
        education: 'Educación',
      },
      // Messages
      messages: {
        loading: 'Cargando...',
        error: 'Error',
        errorOccurred:
          'Ha ocurrido un error inesperado. Por favor, recarga la página.',
        errorDetails: 'Detalles del error',
        reloadPage: 'Recargar página',
        pdfGenerating: 'Generando PDF...',
        pdfReady: 'PDF listo para descargar',
      },
    },
  },
  en: {
    translation: {
      // Navigation
      nav: {
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        education: 'Education',
        contact: 'Contact',
      },
      // Actions
      actions: {
        downloadPDF: 'Download PDF',
        viewMore: 'View more',
        viewLess: 'View less',
        contact: 'Contact',
        interestedCollaborate: 'Interested in collaborating? Contact me!',
        switchLanguage: 'Cambiar a Español',
        copied: 'Copied',
        emailCopied: 'Email copied to clipboard',
      },
      // Labels
      labels: {
        location: 'Location',
        email: 'Email',
        linkedin: 'LinkedIn',
        phone: 'Phone',
        present: 'Present',
        years: 'years',
        year: 'year',
        months: 'months',
        month: 'month',
        remote: 'Remote',
        level: 'Level',
        lastUpdated: 'Last updated',
        language: 'Language',
        selectSection: 'Select section',
      },
      // Sections
      sections: {
        personalInfo: 'Personal Information',
        professionalSummary: 'Professional Summary',
        workExperience: 'Work Experience',
        technicalSkills: 'Technical Skills',
        education: 'Education',
      },
      // Messages
      messages: {
        loading: 'Loading...',
        error: 'Error',
        errorOccurred: 'An unexpected error occurred. Please reload the page.',
        errorDetails: 'Error details',
        reloadPage: 'Reload page',
        pdfGenerating: 'Generating PDF...',
        pdfReady: 'PDF ready for download',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
