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
        inline-flex items-center px-3 py-2 text-sm font-medium
        text-gray-700 bg-white border border-gray-300 rounded-md
        hover:bg-gray-50 hover:text-gray-900
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-colors duration-200
        ${className}
      `}
      aria-label={t('actions.switchLanguage')}
      title={t('actions.switchLanguage')}
    >
      <span className="mr-2">{currentLanguage === 'es' ? '🇺🇸' : '🇪🇸'}</span>
      {t('actions.switchLanguage')}
    </button>
  );
}
