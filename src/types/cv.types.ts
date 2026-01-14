// types/cv.types.ts
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email?: string;
  linkedin?: string;
  phone?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface TechnicalSkill {
  category: string;
  skills: Array<{
    name: string;
    level: number; // 1-5
    years?: number;
  }>;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  location: string;
}

export interface CVData {
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  skills: TechnicalSkill[];
  education: Education[];
  lastUpdated: string;
}

// Re-export SupportedLanguage from i18n types
export type { SupportedLanguage } from './i18n.types';
