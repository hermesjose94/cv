import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header, ErrorBoundary } from '../components/layout';
import type { PersonalInfo } from '../types/cv.types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.about': 'Acerca de',
        'nav.experience': 'Experiencia',
        'nav.skills': 'Habilidades',
        'nav.education': 'Educación',
        'nav.contact': 'Contacto',
        'labels.selectSection': 'Seleccionar sección',
        'labels.lastUpdated': 'Última actualización',
        'labels.language': 'Idioma',
        'messages.error': 'Error',
        'messages.errorOccurred': 'Ha ocurrido un error inesperado',
        'messages.errorDetails': 'Detalles del error',
        'messages.reloadPage': 'Recargar página',
        'actions.switchLanguage': 'Switch to English',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'es',
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock useNavigation hook
vi.mock('../hooks/useNavigation', () => ({
  useNavigation: () => [
    { id: 'about', label: 'Acerca de' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'education', label: 'Educación' },
    { id: 'contact', label: 'Contacto' },
  ],
}));

// Mock LanguageSwitcher
vi.mock('../components/ui/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <button>Language Switcher</button>,
}));

describe('Layout Components', () => {
  const mockPersonalInfo: PersonalInfo = {
    name: 'Hermes Pérez',
    title: 'Tech Lead',
    location: 'Bogotá, Colombia',
    email: 'hermes@example.com',
    linkedin: 'linkedin.com/in/hermes-perez',
  };

  describe('Header Component', () => {
    test('renders header with name and navigation', () => {
      const mockOnNavigate = vi.fn();

      render(
        <Header
          name={mockPersonalInfo.name}
          activeSection="about"
          onNavigate={mockOnNavigate}
        />
      );

      // Check if name is displayed
      expect(screen.getByText('Hermes Pérez')).toBeInTheDocument();

      // Check if navigation items are displayed (desktop navigation)
      const allNavs = screen.getAllByRole('navigation');
      expect(allNavs).toHaveLength(3); // Desktop, tablet, and mobile nav

      // Check specific navigation buttons
      const navButtons = screen.getAllByRole('button');
      const navTexts = navButtons.map((button) => button.textContent);
      expect(navTexts).toContain('Acerca de');
      expect(navTexts).toContain('Experiencia');
      expect(navTexts).toContain('Habilidades');
      expect(navTexts).toContain('Educación');
      expect(navTexts).toContain('Contacto');

      // Check if language switcher is present
      expect(screen.getByText('Language Switcher')).toBeInTheDocument();
    });

    test('calls onNavigate when navigation item is clicked', () => {
      const mockOnNavigate = vi.fn();

      render(
        <Header
          name={mockPersonalInfo.name}
          activeSection="about"
          onNavigate={mockOnNavigate}
        />
      );

      // Click on experience navigation (first button with that text)
      const experienceButtons = screen.getAllByText('Experiencia');
      fireEvent.click(experienceButtons[0]); // Click the first one (desktop nav)
      expect(mockOnNavigate).toHaveBeenCalledWith('experience');
    });

    test('highlights active section', () => {
      const mockOnNavigate = vi.fn();

      render(
        <Header
          name={mockPersonalInfo.name}
          activeSection="experience"
          onNavigate={mockOnNavigate}
        />
      );

      // Check if active section has correct styling (desktop nav button)
      const experienceButtons = screen.getAllByText('Experiencia');
      const desktopButton = experienceButtons.find(
        (button) => button.tagName === 'BUTTON' && button.closest('ul')
      );
      expect(desktopButton).toHaveClass('text-blue-600');
    });

    test('renders mobile navigation select', () => {
      const mockOnNavigate = vi.fn();

      render(
        <Header
          name={mockPersonalInfo.name}
          activeSection="about"
          onNavigate={mockOnNavigate}
        />
      );

      // Check if mobile select is present
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      // Check if select has correct options
      expect(screen.getByText('Seleccionar sección')).toBeInTheDocument();
    });
  });

  describe('ErrorBoundary Component', () => {
    // Mock console.error to avoid noise in tests
    const originalError = console.error;
    beforeEach(() => {
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    test('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Test Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders error fallback when there is an error', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(
        screen.getByText('Ha ocurrido un error inesperado')
      ).toBeInTheDocument();
      expect(screen.getByText('Recargar página')).toBeInTheDocument();
    });

    test('renders custom fallback when provided', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const customFallback = <div>Custom Error Message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    test('reload button calls window.location.reload', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      // Mock window.location.reload
      const mockReload = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByText('Recargar página');
      fireEvent.click(reloadButton);

      expect(mockReload).toHaveBeenCalled();
    });
  });
});
