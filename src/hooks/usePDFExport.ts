import { useCallback } from 'react';
import { PDFExportService } from '../services/pdfExportService';

export function usePDFExport() {
  const exportToPDF = useCallback(async () => {
    if (!PDFExportService.isSupported()) {
      throw new Error('PDF export is not supported in this browser');
    }

    await PDFExportService.generatePDF();
  }, []);

  return {
    exportToPDF,
    isSupported: PDFExportService.isSupported(),
  };
}
