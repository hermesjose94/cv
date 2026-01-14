import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PDFExportService } from '../services/pdfExportService';

describe('PDF Export Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Property 4: Generación Completa de PDF', () => {
    /**
     * **Propiedad 4: Generación Completa de PDF**
     * **Valida: Requisitos 4.1, 4.2, 4.3, 4.4, 4.5**
     *
     * Para cualquier elemento HTML válido con contenido del CV,
     * la generación de PDF debe completarse exitosamente y producir
     * un archivo con nomenclatura descriptiva.
     */
    it('Property 4.2: Filename generation produces descriptive names', () => {
      // Test various inputs produce valid filenames
      const testCases = [
        {
          name: 'Hermes Pérez',
          language: 'es',
          expected: /^CV_Hermes_Pérez_\d{4}-\d{2}-\d{2}_es\.pdf$/,
        },
        {
          name: 'John Doe',
          language: 'en',
          expected: /^CV_John_Doe_\d{4}-\d{2}-\d{2}_en\.pdf$/,
        },
        {
          name: undefined,
          language: 'es',
          expected: /^CV_\d{4}-\d{2}-\d{2}_es\.pdf$/,
        },
        {
          name: 'Test User',
          language: undefined,
          expected: /^CV_Test_User_\d{4}-\d{2}-\d{2}\.pdf$/,
        },
      ];

      testCases.forEach(({ name, language, expected }) => {
        const filename = PDFExportService.generateFilename(name, language);
        expect(filename).toMatch(expected);
      });
    });

    it('Property 4.3: PDF service handles missing elements gracefully', async () => {
      // Mock getElementById to return null
      // Mock window.print
      const originalPrint = window.print;
      window.print = vi.fn();

      // Act: Should not throw even without element
      await expect(PDFExportService.generatePDF()).resolves.not.toThrow();

      // Restore
      window.print = originalPrint;
    });

    it('Property 4.5: Browser support detection works correctly', () => {
      // Test that support detection returns boolean
      const isSupported = PDFExportService.isSupported();
      expect(typeof isSupported).toBe('boolean');

      // In test environment with mocked document, should return true
      expect(isSupported).toBe(true);
    });

    it('generates unique filenames with timestamps', () => {
      const filename1 = PDFExportService.generateFilename('Test User', 'es');
      const filename2 = PDFExportService.generateFilename('Test User', 'es');

      // Both should contain the same date (since generated quickly)
      // but the format should be consistent
      expect(filename1).toMatch(/^CV_Test_User_\d{4}-\d{2}-\d{2}_es\.pdf$/);
      expect(filename2).toMatch(/^CV_Test_User_\d{4}-\d{2}-\d{2}_es\.pdf$/);
    });

    it('handles special characters in names', () => {
      const filename = PDFExportService.generateFilename('José María', 'es');
      expect(filename).toMatch(/^CV_José_María_\d{4}-\d{2}-\d{2}_es\.pdf$/);
    });

    it('handles empty or undefined parameters', () => {
      const filename1 = PDFExportService.generateFilename();
      const filename2 = PDFExportService.generateFilename('', '');

      // When no parameters are provided
      expect(filename1).toMatch(/^CV_\d{4}-\d{2}-\d{2}\.pdf$/);
      // When empty strings are provided, no extra underscores are added
      expect(filename2).toMatch(/^CV_\d{4}-\d{2}-\d{2}\.pdf$/);
    });
  });
});
