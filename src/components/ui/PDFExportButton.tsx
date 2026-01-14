import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PDFExportButtonProps {
  onExport: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function PDFExportButton({
  onExport,
  className = '',
  disabled = false,
}: PDFExportButtonProps) {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    if (disabled || isGenerating) return;

    setIsGenerating(true);
    try {
      await onExport();
    } catch (error) {
      console.error('Error generating PDF:', error);
      // TODO: Show error message to user
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || isGenerating}
      className={`
        inline-flex items-center px-4 py-2 text-sm font-medium
        text-white bg-red-600 border border-transparent rounded-md
        hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
      aria-label={t('actions.downloadPDF')}
    >
      {isGenerating ? (
        <>
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {t('messages.pdfGenerating')}
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {t('actions.downloadPDF')}
        </>
      )}
    </button>
  );
}
