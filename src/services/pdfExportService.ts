export interface PDFExportOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export class PDFExportService {
  /**
   * Genera un PDF del contenido del CV usando window.print()
   */
  static async generatePDF(): Promise<void> {
    // Ocultar elementos no deseados en el PDF
    this.hideElementsForPDF();

    // Agregar clase especial para impresión
    document.body.classList.add('printing-pdf');

    // Esperar un momento para que los estilos se apliquen
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Usar window.print() nativo
    window.print();

    // Restaurar después de cerrar el diálogo de impresión
    // Nota: esto se ejecuta inmediatamente, pero los estilos CSS @media print
    // se encargan de mostrar/ocultar elementos durante la impresión
    setTimeout(() => {
      document.body.classList.remove('printing-pdf');
      this.showElementsAfterPDF();
    }, 500);
  }

  /**
   * Oculta elementos que no deben aparecer en el PDF
   */
  private static hideElementsForPDF(): void {
    // Ocultar header de navegación
    const header = document.querySelector('header');
    if (header) {
      header.dataset.originalDisplay = header.style.display;
      header.style.display = 'none';
    }

    // Ocultar TODOS los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      btn.dataset.originalDisplay = btn.style.display;
      btn.style.display = 'none';
    });

    // Ocultar enlaces tipo botón
    const buttonLinks = document.querySelectorAll(
      'a[class*="bg-blue"], a[class*="rounded-lg"]'
    );
    buttonLinks.forEach((link) => {
      (link as HTMLElement).dataset.originalDisplay = (
        link as HTMLElement
      ).style.display;
      (link as HTMLElement).style.display = 'none';
    });

    // Expandir todas las secciones colapsables
    const expandButtons = document.querySelectorAll('[aria-expanded="false"]');
    expandButtons.forEach((btn) => {
      (btn as HTMLElement).click();
    });
  }

  /**
   * Muestra elementos después de generar el PDF
   */
  private static showElementsAfterPDF(): void {
    const header = document.querySelector('header');
    if (header && header.dataset.originalDisplay !== undefined) {
      header.style.display = header.dataset.originalDisplay;
      delete header.dataset.originalDisplay;
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn.dataset.originalDisplay !== undefined) {
        btn.style.display = btn.dataset.originalDisplay;
        delete btn.dataset.originalDisplay;
      }
    });

    const buttonLinks = document.querySelectorAll(
      'a[class*="bg-blue"], a[class*="rounded-lg"]'
    );
    buttonLinks.forEach((link) => {
      const htmlEl = link as HTMLElement;
      if (htmlEl.dataset.originalDisplay !== undefined) {
        htmlEl.style.display = htmlEl.dataset.originalDisplay;
        delete htmlEl.dataset.originalDisplay;
      }
    });
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
