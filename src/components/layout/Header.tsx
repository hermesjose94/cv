import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { PDFExportButton } from '../ui/PDFExportButton';
import {
  useNavigation,
  type NavigationSection,
} from '../../hooks/useNavigation';
import { usePDFExport } from '../../hooks/usePDFExport';

interface HeaderProps {
  name: string;
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
}

export function Header({ name, onNavigate, activeSection }: HeaderProps) {
  const { t } = useTranslation();
  const sections: NavigationSection[] = useNavigation();
  const { exportToPDF, isSupported } = usePDFExport();

  const handleNavClick = (sectionId: string) => {
    onNavigate?.(sectionId);

    // Smooth scroll to section with offset for sticky header
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Approximate header height in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className="bg-white shadow-sm border-b sticky top-0 z-50"
      data-pdf-exclude="true"
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate pr-2">
            {name}
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <PDFExportButton
              onExport={() => exportToPDF()}
              disabled={!isSupported}
              className="text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
            />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-4 xl:space-x-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`
                    text-sm font-medium transition-all duration-200 relative whitespace-nowrap
                    ${
                      activeSection === section.id
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:block lg:hidden">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`
                  text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200
                  ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden">
          <select
            value={activeSection || ''}
            onChange={(e) => handleNavClick(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">{t('labels.selectSection')}</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
