import type { CVData, SupportedLanguage } from '../types/cv.types';

export class ContentService {
  private static cache: Map<SupportedLanguage, CVData> = new Map();

  static async loadContent(language: SupportedLanguage): Promise<CVData> {
    // Check cache first
    if (this.cache.has(language)) {
      return this.cache.get(language)!;
    }

    try {
      // Dynamic import of JSON data
      const data = await this.fetchContent(language);
      this.validateContent(data);
      this.cache.set(language, data);
      return data;
    } catch (error) {
      console.error(`Error loading content for ${language}:`, error);
      // Fallback to Spanish if English fails
      if (language === 'en') {
        return this.loadContent('es');
      }
      throw error;
    }
  }

  private static async fetchContent(
    language: SupportedLanguage
  ): Promise<CVData> {
    const response = await fetch(`/data/data-${language}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${language} content`);
    }
    return response.json();
  }

  private static validateContent(data: unknown): void {
    // Verificar que data es un objeto
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    const dataObj = data as Record<string, unknown>;

    const required = [
      'personal',
      'summary',
      'experience',
      'skills',
      'education',
    ];

    for (const field of required) {
      if (!dataObj[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate personal info
    const personalObj = dataObj.personal as Record<string, unknown>;
    if (!personalObj?.name || !personalObj?.title) {
      throw new Error('Missing required personal information');
    }

    // Validate arrays
    if (!Array.isArray(dataObj.experience) || dataObj.experience.length === 0) {
      throw new Error('Experience must be a non-empty array');
    }

    if (!Array.isArray(dataObj.skills) || dataObj.skills.length === 0) {
      throw new Error('Skills must be a non-empty array');
    }

    if (!Array.isArray(dataObj.education) || dataObj.education.length === 0) {
      throw new Error('Education must be a non-empty array');
    }
  }

  static clearCache(): void {
    this.cache.clear();
  }
}
