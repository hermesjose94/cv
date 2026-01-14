import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import {
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  TechnicalSkills,
  Education,
} from '../components';
import type {
  PersonalInfo as PersonalInfoType,
  WorkExperience as WorkExperienceType,
  TechnicalSkill,
  Education as EducationType,
} from '../types/cv.types';

// Test data
const mockPersonalInfo: PersonalInfoType = {
  name: 'Hermes Pérez',
  title: 'Tech Lead | Senior Full Stack Developer',
  location: 'Bogotá, Colombia',
  email: 'hermes.perez@example.com',
  linkedin: 'linkedin.com/in/hermes-perez',
  phone: '+57 XXX XXX XXXX',
};

const mockWorkExperience: WorkExperienceType[] = [
  {
    id: 'test-job-1',
    company: 'Test Company',
    position: 'Senior Developer',
    startDate: '2022-01',
    endDate: null,
    location: 'Remote',
    description: 'Leading development of modern web applications',
    highlights: [
      'Led team of 5 developers',
      'Implemented CI/CD pipelines',
      'Reduced deployment time by 50%',
    ],
    technologies: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 'test-job-2',
    company: 'Previous Company',
    position: 'Full Stack Developer',
    startDate: '2020-01',
    endDate: '2021-12',
    location: 'Bogotá',
    description: 'Developed scalable web applications',
    highlights: ['Built REST APIs', 'Optimized database queries'],
    technologies: ['JavaScript', 'PHP', 'MySQL'],
  },
];

const mockTechnicalSkills: TechnicalSkill[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 5, years: 6 },
      { name: 'TypeScript', level: 4, years: 3 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 5, years: 5 },
      { name: 'Python', level: 3, years: 2 },
    ],
  },
];

const mockEducation: EducationType[] = [
  {
    degree: 'Computer Engineering',
    institution: 'Test University',
    startYear: 2015,
    endYear: 2020,
    location: 'Test City',
  },
];

const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

describe('CV Section Components', () => {
  beforeEach(() => {
    i18n.changeLanguage('es');
  });

  describe('PersonalInfo Component', () => {
    it('renders personal information correctly', () => {
      renderWithI18n(<PersonalInfo personalInfo={mockPersonalInfo} />);

      // El nombre aparece dos veces: una para web y otra para PDF
      const names = screen.getAllByText('Hermes Pérez');
      expect(names).toHaveLength(2);
      expect(names[0]).toBeInTheDocument();

      const titles = screen.getAllByText(
        'Tech Lead | Senior Full Stack Developer'
      );
      expect(titles).toHaveLength(2);

      const locations = screen.getAllByText('Bogotá, Colombia');
      expect(locations).toHaveLength(2);

      expect(screen.getByText('hermes.perez@example.com')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();

      // Verificar que el avatar está presente
      const avatar = screen.getByAltText('Hermes Pérez');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', '/avatar.png');
    });

    it('handles missing optional fields gracefully', () => {
      const minimalPersonalInfo = {
        name: 'Test Name',
        title: 'Test Title',
        location: 'Test Location',
      };

      renderWithI18n(<PersonalInfo personalInfo={minimalPersonalInfo} />);

      // El nombre aparece dos veces: una para web y otra para PDF
      const names = screen.getAllByText('Test Name');
      expect(names).toHaveLength(2);

      const titles = screen.getAllByText('Test Title');
      expect(titles).toHaveLength(2);

      const locations = screen.getAllByText('Test Location');
      expect(locations).toHaveLength(2);

      expect(screen.queryByText('@')).not.toBeInTheDocument();
    });
  });

  describe('ProfessionalSummary Component', () => {
    it('renders professional summary correctly', () => {
      const summary =
        'Experienced software engineer with expertise in modern web technologies.';

      renderWithI18n(<ProfessionalSummary summary={summary} />);

      expect(screen.getByText(summary)).toBeInTheDocument();
      expect(screen.getByText('Resumen Profesional')).toBeInTheDocument();
    });
  });

  describe('WorkExperience Component', () => {
    it('renders work experience correctly', () => {
      renderWithI18n(<WorkExperience experience={mockWorkExperience} />);

      expect(screen.getByText('Test Company')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('Previous Company')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
      expect(screen.getByText(/Actualidad/)).toBeInTheDocument(); // Present in Spanish (using regex for partial match)
    });

    it('handles expandable job sections', () => {
      renderWithI18n(<WorkExperience experience={mockWorkExperience} />);

      // Initially, highlights should not be visible
      expect(
        screen.queryByText('Led team of 5 developers')
      ).not.toBeInTheDocument();

      // Click "Ver más" button for first job
      const viewMoreButtons = screen.getAllByText('Ver más');
      fireEvent.click(viewMoreButtons[0]);

      // Now highlights should be visible
      expect(screen.getByText('Led team of 5 developers')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();

      // Click "Ver menos" to collapse
      const viewLessButton = screen.getByText('Ver menos');
      fireEvent.click(viewLessButton);

      // Highlights should be hidden again
      expect(
        screen.queryByText('Led team of 5 developers')
      ).not.toBeInTheDocument();
    });

    it('shows technologies as tags', () => {
      renderWithI18n(<WorkExperience experience={mockWorkExperience} />);

      // Expand first job to see technologies
      const viewMoreButtons = screen.getAllByText('Ver más');
      fireEvent.click(viewMoreButtons[0]);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  describe('TechnicalSkills Component', () => {
    it('renders technical skills correctly', () => {
      renderWithI18n(<TechnicalSkills skills={mockTechnicalSkills} />);

      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('React.js')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders skills as tags', () => {
      renderWithI18n(<TechnicalSkills skills={mockTechnicalSkills} />);

      // Check that skills are rendered as tags with proper styling
      const reactTag = screen.getByText('React.js');
      expect(reactTag).toHaveClass('rounded-full');
      expect(reactTag).toHaveClass('px-3');
    });

    it('shows hover effect on skill tags', () => {
      renderWithI18n(<TechnicalSkills skills={mockTechnicalSkills} />);

      const reactTag = screen.getByText('React.js');
      expect(reactTag).toBeInTheDocument();

      // Hover over the skill tag
      fireEvent.mouseEnter(reactTag);
      expect(reactTag).toHaveClass('bg-blue-600');

      fireEvent.mouseLeave(reactTag);
      expect(reactTag).toHaveClass('bg-blue-50');
    });
  });

  describe('Education Component', () => {
    it('renders education information correctly', () => {
      renderWithI18n(<Education education={mockEducation} />);

      expect(screen.getByText('Computer Engineering')).toBeInTheDocument();
      expect(screen.getByText('Test University')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('2015 - 2020')).toBeInTheDocument();
    });

    it('handles multiple education entries', () => {
      const multipleEducation = [
        ...mockEducation,
        {
          degree: 'Master in Software Engineering',
          institution: 'Another University',
          startYear: 2020,
          endYear: 2022,
          location: 'Another City',
        },
      ];

      renderWithI18n(<Education education={multipleEducation} />);

      expect(screen.getByText('Computer Engineering')).toBeInTheDocument();
      expect(
        screen.getByText('Master in Software Engineering')
      ).toBeInTheDocument();
      expect(screen.getByText('Test University')).toBeInTheDocument();
      expect(screen.getByText('Another University')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('switches language correctly in components', async () => {
      const { rerender } = renderWithI18n(
        <PersonalInfo personalInfo={mockPersonalInfo} />
      );

      // Initially in Spanish
      expect(screen.getByText('Información Personal')).toBeInTheDocument();

      // Switch to English and rerender
      await i18n.changeLanguage('en');
      rerender(
        <I18nextProvider i18n={i18n}>
          <PersonalInfo personalInfo={mockPersonalInfo} />
        </I18nextProvider>
      );

      expect(screen.getByText('Personal Information')).toBeInTheDocument();
    });
  });
});
