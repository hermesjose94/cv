import { useTranslation } from 'react-i18next';
import { useContent } from './hooks/useContent';
import {
  Layout,
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  TechnicalSkills,
  Education,
  Contact,
} from './components';
import { SEO } from './components/common';

function App() {
  const { t } = useTranslation();
  const { content, loading, error } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">
            {t('messages.loading')}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-3 sm:mb-4">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-red-600 font-medium mb-2">
            {t('messages.error')}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 break-words">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {t('messages.error')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO personalInfo={content.personal} />
      <Layout personalInfo={content.personal}>
        <div
          id="cv-content"
          className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8"
        >
          <PersonalInfo personalInfo={content.personal} />
          <ProfessionalSummary summary={content.summary} />
          <WorkExperience experience={content.experience} />
          <TechnicalSkills skills={content.skills} />
          <Education education={content.education} />
          <Contact personalInfo={content.personal} />
        </div>
      </Layout>
    </>
  );
}

export default App;
