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
        {/* Avatar - Solo visible en web, oculto en PDF */}
        <div className="flex items-start gap-4 sm:gap-6 lg:col-span-2 print:hidden">
          <img
            src="/avatar.png"
            alt={personalInfo.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-lg ring-4 ring-blue-100 transition-transform duration-300 hover:scale-105"
          />
          <div className="flex-1 space-y-2 sm:space-y-3">
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
        </div>

        {/* Nombre sin avatar - Solo visible en PDF */}
        <div className="space-y-2 sm:space-y-3 hidden print:block">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {personalInfo.name}
          </h3>
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {personalInfo.title}
          </p>
          <p className="text-sm sm:text-base text-gray-600 flex items-center">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
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

        <div className="space-y-2 sm:space-y-3 lg:col-span-2">
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
          {personalInfo.phone && (
            <a
              href={`tel:${personalInfo.phone}`}
              className="text-sm sm:text-base text-gray-600 hover:text-blue-600 flex items-center transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1 animate-in slide-in-from-right-4 duration-500 delay-400"
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

          {/* Enlaces sociales y web */}
          <div className="flex flex-wrap gap-2 pt-2">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-in slide-in-from-right-4 duration-500 delay-500"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0 group-hover:text-blue-600 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-medium">LinkedIn</span>
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

            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 animate-in slide-in-from-right-4 duration-500 delay-600"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-medium">GitHub</span>
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

            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 animate-in slide-in-from-right-4 duration-500 delay-700"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0 group-hover:text-green-600 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="font-medium">Website</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
