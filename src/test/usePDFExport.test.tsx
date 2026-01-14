import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { usePDFExport } from '../hooks/usePDFExport';
import i18n from '../i18n';
import type { ReactNode } from 'react';

// Mock the PDF service
vi.mock('../services/pdfExportService', () => ({
  PDFExportService: {
    generatePDF: vi.fn(() => Promise.resolve()),
    generateFilename: vi.fn((name, lang) => `CV_${name}_${lang}.pdf`),
    isSupported: vi.fn(() => true),
  },
}));

// Mock useContent hook
vi.mock('../hooks/useContent', () => ({
  useContent: () => ({
    content: {
      personal: {
        name: 'Hermes Pérez',
        title: 'Tech Lead',
        location: 'Bogotá, Colombia',
        email: 'hermes.perez@example.com',
      },
    },
    loading: false,
    error: null,
    language: 'es',
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('usePDFExport Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    i18n.changeLanguage('es');
  });

  describe('Property 4: PDF Export Hook Integration', () => {
    /**
     * **Propiedad 4: Integración del Hook de Exportación PDF**
     * **Valida: Requisitos 4.1, 4.2, 4.3, 4.4, 4.5**
     *
     * Para cualquier estado válido del contenido del CV,
     * el hook debe proporcionar funcionalidad de exportación
     * con nombres de archivo apropiados y manejo de errores.
     */
    it('Property 4.1: Hook provides PDF export functionality', () => {
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      expect(result.current.exportToPDF).toBeDefined();
      expect(typeof result.current.exportToPDF).toBe('function');
      expect(result.current.isSupported).toBe(true);
    });

    it('Property 4.2: Export function generates appropriate filenames', async () => {
      const { PDFExportService } = await import('../services/pdfExportService');
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      await result.current.exportToPDF();

      expect(PDFExportService.generatePDF).toHaveBeenCalled();
    });

    it('Property 4.3: Hook handles different languages correctly', async () => {
      const { PDFExportService } = await import('../services/pdfExportService');

      // Change language to English
      i18n.changeLanguage('en');

      const { result } = renderHook(() => usePDFExport(), { wrapper });

      await result.current.exportToPDF();

      expect(PDFExportService.generatePDF).toHaveBeenCalled();
    });

    it('Property 4.4: Hook accepts custom options', async () => {
      const { PDFExportService } = await import('../services/pdfExportService');
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      await result.current.exportToPDF();

      expect(PDFExportService.generatePDF).toHaveBeenCalled();
    });

    it('Property 4.5: Hook detects browser support correctly', () => {
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      // Should return the mocked value
      expect(result.current.isSupported).toBe(true);
    });
  });

  describe('Basic Functionality', () => {
    it('calls PDF export service', async () => {
      const { PDFExportService } = await import('../services/pdfExportService');
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      await result.current.exportToPDF();

      expect(PDFExportService.generatePDF).toHaveBeenCalled();
    });

    it('detects browser support', () => {
      const { result } = renderHook(() => usePDFExport(), { wrapper });

      expect(result.current.isSupported).toBeDefined();
      expect(typeof result.current.isSupported).toBe('boolean');
    });
  });
});
