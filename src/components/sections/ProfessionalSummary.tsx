import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProfessionalSummaryProps {
  summary: string;
}

export function ProfessionalSummary({ summary }: ProfessionalSummaryProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Determinar si el texto es largo (más de 300 caracteres)
  const isLongText = summary.length > 300;
  const shortText = isLongText ? summary.substring(0, 300) + '...' : summary;

  return (
    <section
      id="summary"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 animate-in slide-in-from-top-2 duration-500">
        {t('sections.professionalSummary')}
      </h2>
      <div className="relative">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose animate-in slide-in-from-bottom-2 duration-500 delay-200">
          {isExpanded || !isLongText ? summary : shortText}
        </p>

        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm group"
          >
            {isExpanded ? t('actions.viewLess') : t('actions.viewMore')}
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              } group-hover:scale-110`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
