import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PersonalInfo } from '../../types/cv.types';

interface ContactProps {
  personalInfo: PersonalInfo;
}

export function Contact({ personalInfo }: ContactProps) {
  const { t } = useTranslation();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Intentar copiar al clipboard primero
    try {
      await navigator.clipboard.writeText(personalInfo.email || '');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // Fallback: abrir cliente de email
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 animate-in slide-in-from-top-2 duration-500">
        {t('nav.contact')}
      </h2>
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed animate-in slide-in-from-bottom-2 duration-500 delay-200">
          {t('actions.interestedCollaborate')}
        </p>

        {/* Mensaje de email copiado */}
        {copiedEmail && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <p className="text-green-700 text-sm font-medium flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {t('actions.emailCopied')}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          {personalInfo.email && (
            <button
              onClick={handleEmailClick}
              onMouseEnter={() => setHoveredButton('email')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`w-full sm:w-auto font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base flex items-center justify-center animate-in slide-in-from-left-4 duration-500 delay-400 ${
                hoveredButton === 'email'
                  ? 'bg-blue-700 text-white shadow-lg transform scale-105'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <svg
                className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                  hoveredButton === 'email' ? 'scale-110' : ''
                }`}
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
              {t('actions.contact')}
            </button>
          )}
          {personalInfo.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton('linkedin')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`w-full sm:w-auto font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base animate-in slide-in-from-right-4 duration-500 delay-500 ${
                hoveredButton === 'linkedin'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <svg
                className={`w-4 h-4 mr-2 flex-shrink-0 transition-transform duration-300 ${
                  hoveredButton === 'linkedin' ? 'scale-110' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
              <svg
                className={`w-3 h-3 ml-1 transition-all duration-300 ${
                  hoveredButton === 'linkedin'
                    ? 'opacity-100 translate-x-1 scale-110'
                    : 'opacity-70'
                }`}
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
    </section>
  );
}
