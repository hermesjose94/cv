import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { WorkExperience as WorkExperienceType } from '../../types/cv.types';

interface WorkExperienceProps {
  experience: WorkExperienceType[];
}

export function WorkExperience({ experience }: WorkExperienceProps) {
  const { t } = useTranslation();
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <section
      id="experience"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 animate-in slide-in-from-top-2 duration-500">
        {t('sections.workExperience')}
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {experience.map((job, index) => {
          const isExpanded = expandedJobs.has(job.id);
          const isHovered = hoveredJob === job.id;
          const hasExpandableContent =
            (job.highlights && job.highlights.length > 0) ||
            (job.technologies && job.technologies.length > 0);

          return (
            <div
              key={job.id}
              className={`border-l-4 border-blue-500 pl-3 sm:pl-4 transition-all rounded-r-lg p-3 -ml-3 animate-in slide-in-from-left-4 duration-500 ${
                isHovered
                  ? 'bg-blue-50 border-blue-600 shadow-sm transform translate-x-1'
                  : 'hover:bg-blue-25'
              }`}
              style={{ animationDelay: `${index * 150 + 300}ms` }}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-semibold truncate transition-colors duration-300 ${
                      isHovered ? 'text-blue-800' : 'text-gray-900'
                    }`}
                  >
                    {job.position}
                  </h3>
                  <p
                    className={`text-sm sm:text-base font-medium break-words transition-colors duration-300 ${
                      isHovered ? 'text-blue-700' : 'text-blue-600'
                    }`}
                  >
                    {job.company}
                  </p>
                </div>
                <div
                  className={`text-xs sm:text-sm mt-1 lg:mt-0 lg:ml-4 lg:text-right flex-shrink-0 transition-colors duration-300 ${
                    isHovered ? 'text-blue-700' : 'text-gray-500'
                  }`}
                >
                  <p className="whitespace-nowrap flex items-center lg:justify-end">
                    <svg
                      className={`w-3 h-3 mr-1 transition-all duration-300 ${
                        isHovered ? 'text-blue-600 scale-110' : 'text-gray-500'
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
                    {job.startDate} - {job.endDate || t('labels.present')}
                  </p>
                  <p className="break-words flex items-center lg:justify-end">
                    <svg
                      className={`w-3 h-3 mr-1 transition-all duration-300 ${
                        isHovered ? 'text-blue-600 scale-110' : 'text-gray-500'
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
                    {job.location}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                {job.description}
              </p>

              {hasExpandableContent && (
                <button
                  onClick={() => toggleJobExpansion(job.id)}
                  className={`text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium mb-3 flex items-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm group ${
                    isHovered ? 'text-blue-700' : ''
                  }`}
                >
                  {isExpanded ? t('actions.viewLess') : t('actions.viewMore')}
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-all duration-300 group-hover:scale-110 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}

              {isExpanded && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300 fade-in">
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-xs sm:text-sm space-y-1 pl-2">
                      {job.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="leading-relaxed animate-in slide-in-from-left-2 duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {job.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all cursor-default animate-in scale-in-95 duration-300"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
