export interface PDFExportOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export class PDFExportService {
  /**
   * Genera un PDF del contenido del CV usando window.print()
   * Los estilos @media print en App.css se encargan automáticamente de:
   * - Ocultar elementos de navegación y botones
   * - Mostrar todo el contenido expandido (resumen completo, experiencia completa)
   * - Formatear el documento para impresión profesional
   */
  static async generatePDF(): Promise<void> {
    // Agregar clase especial para impresión (opcional, para lógica extra si se necesita)
    document.body.classList.add('printing-pdf');

    // Esperar un momento para que los estilos se apliquen
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Usar window.print() nativo
    // Los estilos @media print en App.css manejan todo automáticamente:
    // - Resumen profesional siempre completo (sin truncar)
    // - Experiencia laboral siempre expandida (highlights y tecnologías visibles)
    // - Email y teléfono visibles con sus iconos
    window.print();

    // Restaurar después de cerrar el diálogo de impresión
    setTimeout(() => {
      document.body.classList.remove('printing-pdf');
    }, 500);
  }

  static generateFilename(name?: string, language?: string): string {
    const date = new Date().toISOString().split('T')[0];
    const namePart = name ? `${name.replace(/\s+/g, '_')}_` : '';
    const langPart = language ? `_${language}` : '';
    return `CV_${namePart}${date}${langPart}.pdf`;
  }

  static isSupported(): boolean {
    return typeof window !== 'undefined' && typeof window.print === 'function';
  }
}
