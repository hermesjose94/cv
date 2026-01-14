import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Education as EducationType } from '../../types/cv.types';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="education"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 animate-in slide-in-from-top-2 duration-500">
        {t('sections.education')}
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {education.map((edu, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className={`border-l-4 border-green-500 pl-3 sm:pl-4 transition-all rounded-r-lg p-2 -ml-2 animate-in slide-in-from-left-4 duration-500 ${
                isHovered
                  ? 'bg-green-50 border-green-600 shadow-sm transform translate-x-1'
                  : 'hover:bg-green-25'
              }`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-semibold break-words transition-colors duration-300 ${
                      isHovered ? 'text-green-800' : 'text-gray-900'
                    }`}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    className={`text-sm sm:text-base font-medium break-words transition-colors duration-300 ${
                      isHovered ? 'text-green-700' : 'text-green-600'
                    }`}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className={`text-xs sm:text-sm break-words transition-colors duration-300 flex items-center ${
                      isHovered ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    <svg
                      className={`w-3 h-3 mr-1 transition-all duration-300 ${
                        isHovered ? 'text-green-600 scale-110' : 'text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {edu.location}
                  </p>
                </div>
                <div
                  className={`text-xs sm:text-sm mt-1 lg:mt-0 lg:ml-4 flex-shrink-0 transition-colors duration-300 ${
                    isHovered ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  <p className="whitespace-nowrap flex items-center">
                    <svg
                      className={`w-3 h-3 mr-1 transition-all duration-300 ${
                        isHovered ? 'text-green-600 scale-110' : 'text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 9a2 2 0 002 2h8a2 2 0 002-2l-2-9m-6 0V7"
                      />
                    </svg>
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
