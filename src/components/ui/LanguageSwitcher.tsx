import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../../types/cv.types';

interface LanguageSwitcherProps {
  onLanguageChange?: (language: SupportedLanguage) => void;
  className?: string;
}

export function LanguageSwitcher({
  onLanguageChange,
  className = '',
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  const handleLanguageChange = () => {
    const newLanguage: SupportedLanguage =
      currentLanguage === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className={`
        inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-2 text-sm font-medium
        text-gray-700 bg-white border border-gray-300 rounded-md
        hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-all duration-200 flex-shrink-0
        ${className}
      `}
      aria-label={t('actions.switchLanguage')}
      title={t('actions.switchLanguage')}
    >
      {/* Bandera del idioma actual */}
      <span className="text-sm sm:text-base leading-none">
        {currentLanguage === 'es' ? '🇪🇸' : '🇺🇸'}
      </span>

      {/* Icono de switch/cambio - más pequeño en móvil */}
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 group-hover:rotate-180 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
  );
}
