import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { SEO } from '../components/common/SEO';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'es',
    },
  }),
}));

describe('SEO Component', () => {
  beforeEach(() => {
    // Reset document state before each test
    document.documentElement.lang = 'en';
    document.title = '';

    // Create meta tags that would normally be in index.html
    const metaTags = [
      { name: 'description', content: '' },
      { name: 'title', content: '' },
      { name: 'language', content: 'Spanish' },
      { property: 'og:title', content: '' },
      { property: 'og:description', content: '' },
      { property: 'og:locale', content: 'es_ES' },
      { property: 'twitter:title', content: '' },
      { property: 'twitter:description', content: '' },
    ];

    metaTags.forEach((tag) => {
      const meta = document.createElement('meta');
      if (tag.name) meta.setAttribute('name', tag.name);
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    // Create JSON-LD script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Hermes Pérez',
    });
    document.head.appendChild(script);
  });

  test('renders without crashing', () => {
    const { container } = render(<SEO />);
    expect(container).toBeTruthy();
  });

  test('updates document language attribute to Spanish', () => {
    render(<SEO />);
    expect(document.documentElement.lang).toBe('es');
  });

  test('updates document title with personal info', () => {
    const mockPersonalInfo = {
      name: 'Hermes Pérez',
      title: 'Tech Lead | Senior Full Stack Developer',
      location: 'Bogotá, Colombia',
    };

    render(<SEO personalInfo={mockPersonalInfo} />);

    expect(document.title).toContain('Hermes Pérez');
    expect(document.title).toContain('Tech Lead');
  });

  test('updates meta description with Spanish content', () => {
    render(<SEO />);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toContain(
      'Ingeniero Informático'
    );
  });

  test('updates Open Graph tags', () => {
    render(<SEO />);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toContain('Hermes Pérez');

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('es_ES');
  });

  test('updates structured data with personal info', () => {
    const mockPersonalInfo = {
      name: 'Hermes Pérez',
      title: 'Tech Lead | Senior Full Stack Developer',
      location: 'Bogotá, Colombia',
      linkedin: 'linkedin.com/in/hermes-perez',
    };

    render(<SEO personalInfo={mockPersonalInfo} />);

    const jsonLdScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLdScript).toBeTruthy();

    if (jsonLdScript?.textContent) {
      const structuredData = JSON.parse(jsonLdScript.textContent);
      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Person');
      expect(structuredData.name).toBe('Hermes Pérez');
      expect(structuredData.knowsAbout).toContain('React.js');
    }
  });

  test('validates SEO best practices', () => {
    render(<SEO />);

    const description = document.querySelector('meta[name="description"]');
    const descriptionContent = description?.getAttribute('content') || '';

    expect(descriptionContent.length).toBeGreaterThan(50);
    expect(descriptionContent.length).toBeLessThan(200);
    expect(document.title.length).toBeGreaterThan(10);
  });
});
