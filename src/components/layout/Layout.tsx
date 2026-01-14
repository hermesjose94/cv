import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { ErrorBoundary } from './ErrorBoundary';
import type { PersonalInfo } from '../../types/cv.types';

interface LayoutProps {
  children: ReactNode;
  personalInfo: PersonalInfo;
}

export function Layout({ children, personalInfo }: LayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = ['about', 'experience', 'skills', 'education', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0.1,
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header
          name={personalInfo.name}
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />

        <main className="flex-1">{children}</main>
      </div>
    </ErrorBoundary>
  );
}
