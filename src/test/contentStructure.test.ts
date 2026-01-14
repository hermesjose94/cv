import { describe, test, expect, beforeAll } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { join } from 'path';
import type {
  CVData,
  PersonalInfo,
  WorkExperience,
  TechnicalSkill,
  Education,
} from '../types/cv.types';

// Load data files from public directory
let dataEs: CVData;
let dataEn: CVData;

beforeAll(() => {
  // Load JSON files from public directory using fs
  const esPath = join(process.cwd(), 'public/data/data-es.json');
  const enPath = join(process.cwd(), 'public/data/data-en.json');

  dataEs = JSON.parse(readFileSync(esPath, 'utf-8'));
  dataEn = JSON.parse(readFileSync(enPath, 'utf-8'));
});

describe('Content Structure Properties', () => {
  test('Property 2: JSON data structure validation', () => {
    // Feature: modern-cv-portfolio, Property 2: Estructura y Validación de Datos JSON

    fc.assert(
      fc.property(fc.constantFrom(dataEs, dataEn), (data: CVData) => {
        // Validate required top-level fields
        expect(data).toHaveProperty('personal');
        expect(data).toHaveProperty('summary');
        expect(data).toHaveProperty('experience');
        expect(data).toHaveProperty('skills');
        expect(data).toHaveProperty('education');
        expect(data).toHaveProperty('lastUpdated');

        // Validate personal info structure
        const personal = data.personal as PersonalInfo;
        expect(personal).toHaveProperty('name');
        expect(personal).toHaveProperty('title');
        expect(personal).toHaveProperty('location');
        expect(personal).toHaveProperty('email');
        expect(personal).toHaveProperty('linkedin');
        expect(typeof personal.name).toBe('string');
        expect(personal.name.length).toBeGreaterThan(0);
        expect(typeof personal.title).toBe('string');
        expect(personal.title.length).toBeGreaterThan(0);

        // Validate summary
        expect(typeof data.summary).toBe('string');
        expect(data.summary.length).toBeGreaterThan(0);

        // Validate experience array
        expect(Array.isArray(data.experience)).toBe(true);
        expect(data.experience.length).toBeGreaterThan(0);

        data.experience.forEach((exp: WorkExperience) => {
          expect(exp).toHaveProperty('id');
          expect(exp).toHaveProperty('company');
          expect(exp).toHaveProperty('position');
          expect(exp).toHaveProperty('startDate');
          expect(exp).toHaveProperty('location');
          expect(exp).toHaveProperty('description');
          expect(exp).toHaveProperty('highlights');
          expect(exp).toHaveProperty('technologies');

          expect(typeof exp.id).toBe('string');
          expect(typeof exp.company).toBe('string');
          expect(typeof exp.position).toBe('string');
          expect(Array.isArray(exp.highlights)).toBe(true);
          expect(Array.isArray(exp.technologies)).toBe(true);
        });

        // Validate skills array
        expect(Array.isArray(data.skills)).toBe(true);
        expect(data.skills.length).toBeGreaterThan(0);

        data.skills.forEach((skillCategory: TechnicalSkill) => {
          expect(skillCategory).toHaveProperty('category');
          expect(skillCategory).toHaveProperty('skills');
          expect(typeof skillCategory.category).toBe('string');
          expect(Array.isArray(skillCategory.skills)).toBe(true);
          expect(skillCategory.skills.length).toBeGreaterThan(0);

          skillCategory.skills.forEach((skill) => {
            expect(skill).toHaveProperty('name');
            expect(skill).toHaveProperty('level');
            expect(typeof skill.name).toBe('string');
            expect(typeof skill.level).toBe('number');
            expect(skill.level).toBeGreaterThanOrEqual(1);
            expect(skill.level).toBeLessThanOrEqual(5);
          });
        });

        // Validate education array
        expect(Array.isArray(data.education)).toBe(true);
        expect(data.education.length).toBeGreaterThan(0);

        data.education.forEach((edu: Education) => {
          expect(edu).toHaveProperty('degree');
          expect(edu).toHaveProperty('institution');
          expect(edu).toHaveProperty('startYear');
          expect(edu).toHaveProperty('endYear');
          expect(edu).toHaveProperty('location');

          expect(typeof edu.degree).toBe('string');
          expect(typeof edu.institution).toBe('string');
          expect(typeof edu.startYear).toBe('number');
          expect(typeof edu.endYear).toBe('number');
          expect(edu.startYear).toBeLessThanOrEqual(edu.endYear);
        });

        // Validate lastUpdated format (YYYY-MM-DD)
        expect(typeof data.lastUpdated).toBe('string');
        expect(data.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2.1: Required fields consistency across languages', () => {
    // Feature: modern-cv-portfolio, Property 2: Estructura y Validación de Datos JSON

    fc.assert(
      fc.property(fc.constantFrom('es', 'en'), (language: string) => {
        const data = language === 'es' ? dataEs : dataEn;

        // Both language versions should have the same structure
        expect(data.personal.name).toBe('Hermes Pérez'); // Name should be consistent
        expect(data.experience.length).toBeGreaterThan(0);
        expect(data.skills.length).toBeGreaterThan(0);
        expect(data.education.length).toBeGreaterThan(0);

        // Validate that all experience entries have IDs (for consistency across languages)
        const experienceIds = data.experience.map((exp) => exp.id);
        expect(new Set(experienceIds).size).toBe(experienceIds.length); // All IDs should be unique

        // Validate skill categories exist
        const skillCategories = data.skills.map((skill) => skill.category);
        expect(skillCategories.length).toBeGreaterThan(0);

        // Each skill category should have skills
        data.skills.forEach((category) => {
          expect(category.skills.length).toBeGreaterThan(0);
        });
      }),
      { numRuns: 50 }
    );
  });

  test('Property 2.2: Data integrity validation', () => {
    // Feature: modern-cv-portfolio, Property 2: Estructura y Validación de Datos JSON

    fc.assert(
      fc.property(fc.constantFrom(dataEs, dataEn), (data: CVData) => {
        // Email format validation
        expect(data.personal.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        // LinkedIn URL format validation
        expect(data.personal.linkedin).toMatch(/linkedin\.com\/in\//);

        // Experience date validation
        data.experience.forEach((exp) => {
          // Start date should be in YYYY-MM format or YYYY format
          expect(exp.startDate).toMatch(/^\d{4}(-\d{2})?$/);

          // If endDate exists, it should also be in correct format
          if (exp.endDate) {
            expect(exp.endDate).toMatch(/^\d{4}(-\d{2})?$/);
          }
        });

        // Skills level validation (already checked above but reinforcing)
        data.skills.forEach((category) => {
          category.skills.forEach((skill) => {
            expect(skill.level).toBeGreaterThanOrEqual(1);
            expect(skill.level).toBeLessThanOrEqual(5);
            if (skill.years !== undefined) {
              expect(skill.years).toBeGreaterThan(0);
              expect(skill.years).toBeLessThanOrEqual(20); // Reasonable upper bound
            }
          });
        });
      }),
      { numRuns: 100 }
    );
  });
});
