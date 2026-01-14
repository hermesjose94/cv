import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TechnicalSkill } from '../../types/cv.types';

interface TechnicalSkillsProps {
  skills: TechnicalSkill[];
}

export function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  const { t } = useTranslation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
        {t('sections.technicalSkills')}
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {skills.map((skillGroup, index) => (
          <div key={index}>
            <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.skills.map((skill, skillIndex) => {
                const skillKey = `${skillGroup.category}-${skill.name}`;
                const isHovered = hoveredSkill === skillKey;

                return (
                  <span
                    key={skillIndex}
                    onMouseEnter={() => setHoveredSkill(skillKey)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-200 cursor-default
                      ${
                        isHovered
                          ? 'bg-blue-600 text-white shadow-md transform scale-105'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }
                    `}
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
