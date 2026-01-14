import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  personalInfo?: {
    name: string;
    title: string;
    location: string;
    linkedin?: string;
  };
}

export function SEO({ personalInfo }: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = currentLang;

    // Actualizar meta tags dinámicamente según el idioma
    const description =
      currentLang === 'es'
        ? 'Ingeniero Informático con más de 8 años de experiencia liderando equipos de desarrollo. Especializado en React, Node.js, TypeScript, AWS y arquitecturas cloud-native.'
        : 'Computer Engineer with over 8 years of experience leading development teams. Specialized in React, Node.js, TypeScript, AWS and cloud-native architectures.';

    const title = personalInfo
      ? `${personalInfo.name} - ${personalInfo.title}`
      : currentLang === 'es'
        ? 'Hermes Pérez - Tech Lead | Senior Full Stack Developer'
        : 'Hermes Pérez - Tech Lead | Senior Full Stack Developer';

    // Actualizar title
    document.title = title;

    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Actualizar meta title
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', title);
    }

    // Actualizar Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute(
        'content',
        currentLang === 'es' ? 'es_ES' : 'en_US'
      );
    }

    // Actualizar Twitter
    const twitterTitle = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Actualizar meta language
    const metaLanguage = document.querySelector('meta[name="language"]');
    if (metaLanguage) {
      metaLanguage.setAttribute(
        'content',
        currentLang === 'es' ? 'Spanish' : 'English'
      );
    }

    // Actualizar datos estructurados JSON-LD
    if (personalInfo) {
      const existingScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (existingScript) {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personalInfo.name,
          jobTitle: personalInfo.title,
          description:
            currentLang === 'es'
              ? 'Ingeniero Informático con más de 8 años de experiencia liderando equipos de desarrollo'
              : 'Computer Engineer with over 8 years of experience leading development teams',
          url: 'https://hermesperez.github.io/cv/',
          address: {
            '@type': 'PostalAddress',
            addressLocality: personalInfo.location.split(',')[0].trim(),
            addressCountry:
              personalInfo.location.split(',')[1]?.trim() || 'Colombia',
          },
          alumniOf: {
            '@type': 'EducationalOrganization',
            name:
              currentLang === 'es'
                ? 'Universidad Nacional Experimental del Táchira'
                : 'National Experimental University of Táchira',
          },
          knowsAbout: [
            'React.js',
            'Node.js',
            'TypeScript',
            'AWS',
            'Next.js',
            'Full Stack Development',
            'Cloud Architecture',
            'DevOps',
            'Team Leadership',
          ],
          sameAs: personalInfo.linkedin
            ? [`https://${personalInfo.linkedin}`]
            : [],
        };

        existingScript.textContent = JSON.stringify(structuredData, null, 2);
      }
    }
  }, [currentLang, personalInfo]);

  return null; // Este componente no renderiza nada visible
}
