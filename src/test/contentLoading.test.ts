import { describe, test, expect, beforeEach, vi } from 'vitest';
import fc from 'fast-check';
import { ContentService } from '../services/contentService';
import type { SupportedLanguage } from '../types/cv.types';

// Mock fetch for testing
const mockFetch = vi.fn();
(globalThis as typeof globalThis & { fetch: typeof mockFetch }).fetch =
  mockFetch;

describe('Content Loading Properties', () => {
  beforeEach(() => {
    // Clear cache and mocks before each test
    ContentService.clearCache();
    mockFetch.mockClear();
  });

  test('Property 1: Dynamic multilanguage content loading', async () => {
    // Feature: modern-cv-portfolio, Property 1: Carga Dinámica de Contenido Multilenguaje

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('es' as SupportedLanguage, 'en' as SupportedLanguage),
        async (language: SupportedLanguage) => {
          // Clear cache for each property test iteration
          ContentService.clearCache();
          mockFetch.mockClear();

          // Mock successful response
          const mockData = {
            personal: {
              name: 'Hermes Pérez',
              title: 'Tech Lead',
              location: 'Bogotá, Colombia',
              email: 'hermes@example.com',
              linkedin: 'linkedin.com/in/hermes-perez',
            },
            summary: 'Test summary',
            experience: [
              {
                id: 'test-exp',
                company: 'Test Company',
                position: 'Developer',
                startDate: '2020-01',
                location: 'Remote',
                description: 'Test description',
                highlights: ['Test highlight'],
                technologies: ['React'],
              },
            ],
            skills: [
              {
                category: 'Frontend',
                skills: [{ name: 'React', level: 5 }],
              },
            ],
            education: [
              {
                degree: 'Computer Science',
                institution: 'Test University',
                startYear: 2015,
                endYear: 2019,
                location: 'Test City',
              },
            ],
            lastUpdated: '2025-01-13',
          };

          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
          });

          const content = await ContentService.loadContent(language);

          // Verify that the content is loaded correctly
          expect(content).toBeDefined();
          expect(content.personal).toBeDefined();
          expect(content.experience).toBeInstanceOf(Array);
          expect(content.skills).toBeInstanceOf(Array);
          expect(content.education).toBeInstanceOf(Array);

          // Verify content structure
          expect(content.personal.name).toBe('Hermes Pérez');
          expect(content.experience.length).toBeGreaterThan(0);
          expect(content.skills.length).toBeGreaterThan(0);
          expect(content.education.length).toBeGreaterThan(0);

          // Verify fetch was called with correct URL
          expect(mockFetch).toHaveBeenCalledWith(`/data/data-${language}.json`);
        }
      ),
      { numRuns: 3 } // Reduced runs for async tests
    );
  });

  test('Property 1.1: Content validation with proper error handling', async () => {
    // Feature: modern-cv-portfolio, Property 1: Carga Dinámica de Contenido Multilenguaje

    // Clear cache to ensure fresh test
    ContentService.clearCache();
    mockFetch.mockClear();

    // Test with completely missing required fields
    const invalidData = {
      // Missing all required fields
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    });

    // Should throw error for invalid data when loading Spanish (no fallback)
    await expect(ContentService.loadContent('es')).rejects.toThrow(
      'Missing required field'
    );
  });

  test('Property 1.2: Successful caching behavior', async () => {
    // Feature: modern-cv-portfolio, Property 1: Carga Dinámica de Contenido Multilenguaje

    // Clear cache to ensure fresh test
    ContentService.clearCache();
    mockFetch.mockClear();

    const mockData = {
      personal: {
        name: 'Hermes Pérez',
        title: 'Tech Lead',
        location: 'Bogotá, Colombia',
        email: 'hermes@example.com',
        linkedin: 'linkedin.com/in/hermes-perez',
      },
      summary: 'Cached content test',
      experience: [
        {
          id: 'test-exp',
          company: 'Test Company',
          position: 'Developer',
          startDate: '2020-01',
          location: 'Remote',
          description: 'Test description',
          highlights: ['Test highlight'],
          technologies: ['React'],
        },
      ],
      skills: [
        {
          category: 'Frontend',
          skills: [{ name: 'React', level: 5 }],
        },
      ],
      education: [
        {
          degree: 'Computer Science',
          institution: 'Test University',
          startYear: 2015,
          endYear: 2019,
          location: 'Test City',
        },
      ],
      lastUpdated: '2025-01-13',
    };

    // Mock fetch to be called only once
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    // Load content twice
    const content1 = await ContentService.loadContent('es');
    const content2 = await ContentService.loadContent('es');

    // Verify both calls return the same data
    expect(content1).toEqual(content2);
    expect(content1.summary).toBe('Cached content test');

    // Verify fetch was called only once (cached on second call)
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
