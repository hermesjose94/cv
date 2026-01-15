import { useContent } from '../hooks/useContent';
import {
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  TechnicalSkills,
  Education,
} from '../components';

/**
 * PrintPreview - Página de vista previa con estilos de impresión aplicados
 * Accesible en /print para inspeccionar con DevTools
 */
export function PrintPreview() {
  const { content, loading, error } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-base text-black">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-base text-red-600">Error cargando el CV</p>
        </div>
      </div>
    );
  }

  return (
    <div className="print-preview-mode">
      {/* Contenido del CV con estilos de impresión */}
      <main
        style={{
          marginTop: 0,
          padding: 0,
          background: '#ffffff',
        }}
      >
        <div
          id="cv-content"
          style={{
            maxWidth: '100%',
            margin: 0,
            padding: 0,
            background: '#ffffff',
          }}
        >
          <PersonalInfo personalInfo={content.personal} />
          <ProfessionalSummary summary={content.summary} />
          <WorkExperience experience={content.experience} />
          <TechnicalSkills skills={content.skills} />
          <Education education={content.education} />
        </div>
      </main>

      {/* Estilos inline para simular @media print */}
      <style>{`
        .print-preview-mode {
          background: #ffffff !important;
        }

        .print-preview-mode body {
          background-color: #ffffff !important;
          background: #ffffff !important;
          margin: 0;
          padding: 0;
        }

        .print-preview-mode #root {
          max-width: 100%;
          margin: 0;
          padding: 0;
          background-color: #ffffff !important;
          background: #ffffff !important;
        }

        .print-preview-mode main {
          padding: 0 !important;
          margin: 0 !important;
          background: #ffffff !important;
        }

        /* Ocultar header/navegación */
        .print-preview-mode header {
          display: none !important;
        }

        /* Resetear estilos a minimalista */
        .print-preview-mode * {
          color: #000 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }

        /* Eliminar gap del grid en print preview */
        .print-preview-mode .grid {
          gap: 0 !important;
        }

        /* Ocultar TODOS los iconos SVG */
        .print-preview-mode svg {
          display: none !important;
        }

        /* Secciones */
        .print-preview-mode section {
          page-break-inside: auto;
          margin-bottom: 6mm !important;
          padding: 0 !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
        }

        .print-preview-mode section:first-child {
          margin-top: 0 !important;
        }

        /* Títulos de sección */
        .print-preview-mode section > h2 {
          text-transform: uppercase !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #000 !important;
          border-bottom: 1px solid #000 !important;
          padding-bottom: 3px !important;
          margin-bottom: 8px !important;
          margin-top: 12px !important;
        }

        /* HEADER - INFORMACIÓN PERSONAL */
        .print-preview-mode #about {
          text-align: center !important;
          margin-bottom: 4mm !important;
          padding: 0 !important;
          background: white !important;
        }

        .print-preview-mode #about > h2 {
          display: none !important;
        }

        .print-preview-mode #about img {
          display: none !important;
        }

        .print-preview-mode #about > div > div.print\\:hidden {
          display: block !important;
          text-align: center !important;
        }

        .print-preview-mode #about h3 {
          text-align: center !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          color: #000 !important;
          margin-bottom: 1px !important;
          margin-top: 0 !important;
          letter-spacing: 0 !important;
        }

        .print-preview-mode #about .flex-1 > p:nth-of-type(1) {
          text-align: center !important;
          font-size: 11px !important;
          color: #000 !important;
          margin: 0 !important;
          font-weight: 400 !important;
        }

        .print-preview-mode #about .flex-1 > p:nth-of-type(2) {
          display: none !important;
        }

        .print-preview-mode #about .flex-1 {
          display: block !important;
          margin: 0 !important;
        }

        .print-preview-mode #about .lg\\:col-span-2:last-child {
          text-align: center !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .print-preview-mode #about > div > div:last-child {
          margin: 0 !important;
          padding: 0 !important;
        }

        .print-preview-mode #about button.print\\:hidden {
          display: none !important;
        }

        .print-preview-mode #about .print\\:flex {
          display: inline !important;
          color: #000 !important;
          margin-right: 5px !important;
          font-size: 11px !important;
          margin: 0 !important;
        }

        .print-preview-mode #about a[href^='tel:']:not([href*='http']) {
          display: inline !important;
          color: #000 !important;
          font-size: 11px !important;
          text-decoration: none !important;
          margin-left: 5px !important;
          margin: 0 0 0 5px !important;
        }

        .print-preview-mode #about .flex-wrap {
          display: none !important;
        }

        .print-preview-mode #about .pt-2 {
          display: none !important;
        }

        .print-preview-mode #about a[href*='linkedin'],
        .print-preview-mode #about a[href*='github'],
        .print-preview-mode #about a[href*='http'] {
          display: none !important;
        }

        .print-preview-mode #about .print\\:block {
          display: none !important;
        }

        /* RESUMEN PROFESIONAL */
        .print-preview-mode #summary {
          margin-bottom: 6mm !important;
        }

        .print-preview-mode #summary p {
          font-size: 11px !important;
          line-height: 1.6 !important;
          text-align: justify !important;
          color: #000 !important;
          margin: 0 !important;
          max-height: none !important;
          overflow: visible !important;
        }

        .print-preview-mode #summary button {
          display: none !important;
        }

        .print-preview-mode #summary .relative {
          max-height: none !important;
          overflow: visible !important;
        }

        /* EXPERIENCIA LABORAL */
        .print-preview-mode #experience {
          margin-bottom: 6mm !important;
        }

        .print-preview-mode #experience > div > div {
          border-left: none !important;
          padding: 0 !important;
          margin: 0 !important;
          background: none !important;
          page-break-inside: avoid;
        }

        .print-preview-mode #experience > div > div + div {
          margin-top: 3mm !important;
        }

        .print-preview-mode #experience h3 {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #000 !important;
          font-style: italic !important;
          margin: 0 !important;
        }

        .print-preview-mode #experience p {
          font-size: 10px !important;
          line-height: 1.5 !important;
          color: #000 !important;
          margin: 2px 0 !important;
        }

        .print-preview-mode #experience ul {
          margin: 3px 0 !important;
          padding-left: 15px !important;
          list-style-type: disc !important;
        }

        .print-preview-mode #experience li {
          font-size: 10px !important;
          line-height: 1.5 !important;
          color: #000 !important;
          margin-bottom: 2px !important;
        }

        .print-preview-mode #experience ul li::marker {
          color: #000 !important;
        }

        .print-preview-mode #experience span.rounded-full,
        .print-preview-mode #experience span.bg-gray-100 {
          display: inline !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 2px 0 0 !important;
          color: #000 !important;
          font-size: 10px !important;
        }

        .print-preview-mode #experience .flex-wrap {
          display: block !important;
        }

        /* HABILIDADES */
        .print-preview-mode #skills {
          margin-bottom: 6mm !important;
        }

        .print-preview-mode #skills span[class*='bg-blue'],
        .print-preview-mode #skills span.rounded-full {
          background: none !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 2px !important;
          color: #000 !important;
          display: inline !important;
          font-size: 10px !important;
        }

        .print-preview-mode #skills .flex-wrap {
          display: block !important;
          margin-bottom: 4px !important;
        }

        .print-preview-mode #skills h3 {
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #000 !important;
          display: inline !important;
          margin-right: 5px !important;
        }

        /* EDUCACIÓN */
        .print-preview-mode #education {
          margin-bottom: 6mm !important;
        }

        .print-preview-mode #education > div > div {
          border-left: none !important;
          padding-left: 0 !important;
          margin-left: 0 !important;
          background: none !important;
          padding: 0 !important;
          margin-bottom: 3mm !important;
        }

        .print-preview-mode #education h3 {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #000 !important;
          font-style: italic !important;
          margin: 0 !important;
        }

        .print-preview-mode #education p {
          font-size: 10px !important;
          line-height: 1.5 !important;
          color: #000 !important;
          margin: 2px 0 !important;
        }

        /* Botones "Ver más" */
        .print-preview-mode button.print\\:hidden {
          display: none !important;
        }

        /* Viñetas negras */
        .print-preview-mode ul li::marker {
          color: #000 !important;
        }

        /* Reducir espaciado global */
        .print-preview-mode div,
        .print-preview-mode p,
        .print-preview-mode ul,
        .print-preview-mode li {
          margin-top: 0 !important;
        }

        /* Ocultar banner en impresión real */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
