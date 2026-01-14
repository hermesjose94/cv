import { describe, test, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import i18n from '../i18n';
import type { SupportedLanguage } from '../types/cv.types';

describe('Internationalization Properties', () => {
  beforeEach(async () => {
    // Reset i18n to default state
    await i18n.changeLanguage('es');
  });

  test('Property 3: Language persistence and detection', async () => {
    // Feature: modern-cv-portfolio, Property 3: Persistencia y Detección de Idioma

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('es' as SupportedLanguage, 'en' as SupportedLanguage),
        async (language: SupportedLanguage) => {
          // Change language
          await i18n.changeLanguage(language);

          // Verify language was changed
          expect(i18n.language).toBe(language);

          // Verify translations are available for the language
          expect(i18n.exists('nav.about')).toBe(true);
          expect(i18n.exists('actions.downloadPDF')).toBe(true);
          expect(i18n.exists('sections.personalInfo')).toBe(true);

          // Verify translations return correct values
          const aboutTranslation = i18n.t('nav.about');
          const downloadTranslation = i18n.t('actions.downloadPDF');

          expect(aboutTranslation).toBeDefined();
          expect(downloadTranslation).toBeDefined();
          expect(typeof aboutTranslation).toBe('string');
          expect(typeof downloadTranslation).toBe('string');

          // Verify language-specific content
          if (language === 'es') {
            expect(aboutTranslation).toBe('Acerca de');
            expect(downloadTranslation).toBe('Descargar PDF');
          } else {
            expect(aboutTranslation).toBe('About');
            expect(downloadTranslation).toBe('Download PDF');
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3.1: Translation key completeness', () => {
    // Feature: modern-cv-portfolio, Property 3: Persistencia y Detección de Idioma

    const requiredKeys = [
      'nav.about',
      'nav.experience',
      'nav.skills',
      'nav.education',
      'nav.contact',
      'actions.downloadPDF',
      'actions.viewMore',
      'actions.viewLess',
      'actions.contact',
      'actions.switchLanguage',
      'labels.location',
      'labels.email',
      'labels.linkedin',
      'labels.present',
      'sections.personalInfo',
      'sections.professionalSummary',
      'sections.workExperience',
      'sections.technicalSkills',
      'sections.education',
      'messages.loading',
      'messages.error',
    ];

    fc.assert(
      fc.property(
        fc.constantFrom('es' as SupportedLanguage, 'en' as SupportedLanguage),
        (language: SupportedLanguage) => {
          // Set language
          i18n.changeLanguage(language);

          // Verify all required keys exist
          for (const key of requiredKeys) {
            expect(i18n.exists(key)).toBe(true);

            const translation = i18n.t(key);
            expect(translation).toBeDefined();
            expect(typeof translation).toBe('string');
            expect(translation.length).toBeGreaterThan(0);

            // Ensure translation is not the key itself (missing translation)
            expect(translation).not.toBe(key);
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 3.2: Fallback behavior', async () => {
    // Feature: modern-cv-portfolio, Property 3: Persistencia y Detección de Idioma

    // Test that translations still work even with invalid language
    await i18n.changeLanguage('invalid-lang' as SupportedLanguage);

    // Translations should still work (fallback to configured fallbackLng)
    const aboutTranslation = i18n.t('nav.about');
    const downloadTranslation = i18n.t('actions.downloadPDF');

    expect(aboutTranslation).toBeDefined();
    expect(downloadTranslation).toBeDefined();
    expect(typeof aboutTranslation).toBe('string');
    expect(typeof downloadTranslation).toBe('string');

    // Should use fallback language translations (Spanish)
    expect(aboutTranslation).toBe('Acerca de');
    expect(downloadTranslation).toBe('Descargar PDF');
  });

  test('Property 3.3: Language switching consistency', async () => {
    // Feature: modern-cv-portfolio, Property 3: Persistencia y Detección de Idioma

    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.constantFrom('es' as SupportedLanguage, 'en' as SupportedLanguage),
          { minLength: 2, maxLength: 5 }
        ),
        async (languages: SupportedLanguage[]) => {
          let previousLanguage: SupportedLanguage | null = null;

          for (const language of languages) {
            await i18n.changeLanguage(language);

            // Verify language changed
            expect(i18n.language).toBe(language);

            // Verify translations are consistent for the language
            const aboutTranslation = i18n.t('nav.about');

            if (language === 'es') {
              expect(aboutTranslation).toBe('Acerca de');
            } else {
              expect(aboutTranslation).toBe('About');
            }

            // Verify language actually changed if different from previous
            if (previousLanguage && previousLanguage !== language) {
              const previousAbout =
                previousLanguage === 'es' ? 'Acerca de' : 'About';
              expect(aboutTranslation).not.toBe(previousAbout);
            }

            previousLanguage = language;
          }
        }
      ),
      { numRuns: 5 }
    );
  });
});
