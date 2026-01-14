import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PersonalInfo as PersonalInfoType } from '../../types/cv.types';

interface PersonalInfoProps {
  personalInfo: PersonalInfoType;
}

export function PersonalInfo({ personalInfo }: PersonalInfoProps) {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Copiar email al clipboard
    try {
      await navigator.clipboard.writeText(personalInfo.email || '');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback: abrir cliente de email
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section
      id="about"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
        {t('sections.personalInfo')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight animate-in slide-in-from-left-4 duration-500">
            {personalInfo.name}
          </h3>
          <p className="text-base sm:text-lg text-gray-700 font-medium animate-in slide-in-from-left-4 duration-500 delay-100">
            {personalInfo.title}
          </p>
          <p className="text-sm sm:text-base text-gray-600 flex items-center animate-in slide-in-from-left-4 duration-500 delay-200 group">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0 transition-transform group-hover:scale-110"
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
            <span className="break-words">{personalInfo.location}</span>
          </p>
        </div>
        <div className="space-y-2 sm:space-y-3 mt-4 lg:mt-0">
          {personalInfo.email && (
            <button
              onClick={handleEmailClick}
              className="text-sm sm:text-base text-gray-600 hover:text-blue-600 flex items-center transition-all group w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1 animate-in slide-in-from-right-4 duration-500 delay-300"
            >
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all flex-1">{personalInfo.email}</span>
              {copiedEmail && (
                <span className="text-xs text-green-600 ml-2 animate-in fade-in duration-200">
                  {t('actions.copied')}
                </span>
              )}
            </button>
          )}
          {personalInfo.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-gray-600 hover:text-blue-600 flex items-center transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1 animate-in slide-in-from-right-4 duration-500 delay-400"
            >
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="break-words">LinkedIn</span>
              <svg
                className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          {personalInfo.phone && (
            <a
              href={`tel:${personalInfo.phone}`}
              className="text-sm sm:text-base text-gray-600 hover:text-blue-600 flex items-center transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1 animate-in slide-in-from-right-4 duration-500 delay-500"
            >
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="break-words">{personalInfo.phone}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
