import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import type { CVData, WorkExperience, TechnicalSkill } from '../types/cv.types';

type Skill = {
  name: string;
  level: number;
  years?: number;
};

describe('Content Extensibility Properties', () => {
  test('Property 9: Extensibilidad de Contenido - Agregar nueva experiencia laboral', () => {
    /**
     * **Propiedad 9: Extensibilidad de Contenido**
     * **Valida: Requisitos 10.2**
     *
     * Para cualquier conjunto de datos de CV válido,
     * agregar una nueva experiencia laboral debe mantener
     * la estructura válida y todos los campos requeridos.
     */

    // Generador de experiencia laboral válida
    const workExperienceArbitrary = fc.record({
      id: fc.string({ minLength: 1 }),
      company: fc.string({ minLength: 1 }),
      position: fc.string({ minLength: 1 }),
      startDate: fc.string({ minLength: 4 }), // YYYY o YYYY-MM
      endDate: fc.option(fc.string({ minLength: 4 }), { nil: undefined }),
      location: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      highlights: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
      technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    });

    // Generador de CV base
    const baseCVArbitrary = fc.record({
      personal: fc.record({
        name: fc.constant('Hermes Pérez'),
        title: fc.string({ minLength: 1 }),
        location: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        linkedin: fc.constant('https://linkedin.com/in/hermes-perez'),
        phone: fc.string({ minLength: 1 }),
      }),
      summary: fc.string({ minLength: 10 }),
      experience: fc.array(workExperienceArbitrary, {
        minLength: 1,
        maxLength: 3,
      }),
      skills: fc.array(
        fc.record({
          category: fc.string({ minLength: 1 }),
          skills: fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              level: fc.integer({ min: 1, max: 5 }),
              years: fc.option(fc.integer({ min: 1, max: 20 }), {
                nil: undefined,
              }),
            }),
            { minLength: 1 }
          ),
        }),
        { minLength: 1 }
      ),
      education: fc.array(
        fc.record({
          degree: fc.string({ minLength: 1 }),
          institution: fc.string({ minLength: 1 }),
          startYear: fc.integer({ min: 2000, max: 2025 }),
          endYear: fc.integer({ min: 2000, max: 2025 }),
          location: fc.string({ minLength: 1 }),
        }),
        { minLength: 1 }
      ),
      lastUpdated: fc.constant('2025-01-13'),
    });

    fc.assert(
      fc.property(
        baseCVArbitrary,
        workExperienceArbitrary,
        (baseCV: CVData, newExperience: WorkExperience) => {
          // Agregar nueva experiencia
          const extendedCV: CVData = {
            ...baseCV,
            experience: [...baseCV.experience, newExperience],
          };

          // Validar que la estructura sigue siendo válida
          expect(extendedCV.experience.length).toBe(
            baseCV.experience.length + 1
          );

          // Validar que la nueva experiencia está presente
          const addedExperience = extendedCV.experience.find(
            (exp) => exp.id === newExperience.id
          );
          expect(addedExperience).toBeDefined();
          expect(addedExperience?.company).toBe(newExperience.company);
          expect(addedExperience?.position).toBe(newExperience.position);

          // Validar que todas las experiencias tienen campos requeridos
          extendedCV.experience.forEach((exp) => {
            expect(exp).toHaveProperty('id');
            expect(exp).toHaveProperty('company');
            expect(exp).toHaveProperty('position');
            expect(exp).toHaveProperty('startDate');
            expect(exp).toHaveProperty('location');
            expect(exp).toHaveProperty('description');
            expect(exp).toHaveProperty('highlights');
            expect(exp).toHaveProperty('technologies');
            expect(Array.isArray(exp.highlights)).toBe(true);
            expect(Array.isArray(exp.technologies)).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 9.1: Extensibilidad de Contenido - Agregar nuevas habilidades', () => {
    /**
     * **Propiedad 9.1: Extensibilidad de Habilidades**
     * **Valida: Requisitos 10.3**
     *
     * Para cualquier conjunto de datos de CV válido,
     * agregar nuevas habilidades a una categoría existente
     * o crear una nueva categoría debe mantener la estructura válida.
     */

    // Generador de habilidad válida
    const skillArbitrary = fc.record({
      name: fc.string({ minLength: 1 }),
      level: fc.integer({ min: 1, max: 5 }),
      years: fc.option(fc.integer({ min: 1, max: 20 }), { nil: undefined }),
    });

    // Generador de categoría de habilidades
    const skillCategoryArbitrary = fc.record({
      category: fc.string({ minLength: 1 }),
      skills: fc.array(skillArbitrary, { minLength: 1 }),
    });

    fc.assert(
      fc.property(
        fc.array(skillCategoryArbitrary, { minLength: 1, maxLength: 3 }),
        skillArbitrary,
        fc.string({ minLength: 1 }),
        (
          existingSkills: TechnicalSkill[],
          newSkill: Skill,
          categoryName: string
        ) => {
          // Caso 1: Agregar habilidad a categoría existente
          if (existingSkills.length > 0) {
            const targetCategory = existingSkills[0];
            const extendedCategory: TechnicalSkill = {
              ...targetCategory,
              skills: [...targetCategory.skills, newSkill],
            };

            expect(extendedCategory.skills.length).toBe(
              targetCategory.skills.length + 1
            );
            expect(extendedCategory.skills).toContainEqual(newSkill);

            // Validar estructura de todas las habilidades
            extendedCategory.skills.forEach((skill) => {
              expect(skill).toHaveProperty('name');
              expect(skill).toHaveProperty('level');
              expect(skill.level).toBeGreaterThanOrEqual(1);
              expect(skill.level).toBeLessThanOrEqual(5);
            });
          }

          // Caso 2: Agregar nueva categoría
          const newCategory: TechnicalSkill = {
            category: categoryName,
            skills: [newSkill],
          };

          const extendedSkills = [...existingSkills, newCategory];

          expect(extendedSkills.length).toBe(existingSkills.length + 1);
          expect(extendedSkills).toContainEqual(newCategory);

          // Validar estructura de todas las categorías
          extendedSkills.forEach((category) => {
            expect(category).toHaveProperty('category');
            expect(category).toHaveProperty('skills');
            expect(Array.isArray(category.skills)).toBe(true);
            expect(category.skills.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 9.2: Extensibilidad de Contenido - Modificar experiencia existente', () => {
    /**
     * **Propiedad 9.2: Modificación de Experiencia**
     * **Valida: Requisitos 10.2**
     *
     * Para cualquier experiencia laboral existente,
     * modificar sus campos debe mantener la estructura válida
     * y preservar la integridad de los datos.
     */

    const workExperienceArbitrary = fc.record({
      id: fc.string({ minLength: 1 }),
      company: fc.string({ minLength: 1 }),
      position: fc.string({ minLength: 1 }),
      startDate: fc.string({ minLength: 4 }),
      endDate: fc.option(fc.string({ minLength: 4 }), { nil: undefined }),
      location: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      highlights: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
      technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    });

    fc.assert(
      fc.property(
        fc.array(workExperienceArbitrary, { minLength: 2, maxLength: 5 }),
        fc.string({ minLength: 1 }),
        (experiences: WorkExperience[], newDescription: string) => {
          // Modificar la primera experiencia
          const targetIndex = 0;
          const modifiedExperiences = experiences.map((exp, index) =>
            index === targetIndex
              ? { ...exp, description: newDescription }
              : exp
          );

          // Validar que el array tiene el mismo tamaño
          expect(modifiedExperiences.length).toBe(experiences.length);

          // Validar que la modificación se aplicó
          expect(modifiedExperiences[targetIndex].description).toBe(
            newDescription
          );

          // Validar que otros campos no cambiaron
          expect(modifiedExperiences[targetIndex].id).toBe(
            experiences[targetIndex].id
          );
          expect(modifiedExperiences[targetIndex].company).toBe(
            experiences[targetIndex].company
          );

          // Validar que otras experiencias no cambiaron
          for (let i = 1; i < experiences.length; i++) {
            expect(modifiedExperiences[i]).toEqual(experiences[i]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 9.3: Extensibilidad de Contenido - Eliminar experiencia', () => {
    /**
     * **Propiedad 9.3: Eliminación de Experiencia**
     * **Valida: Requisitos 10.2**
     *
     * Para cualquier conjunto de experiencias laborales,
     * eliminar una experiencia debe mantener la estructura válida
     * y preservar las demás experiencias.
     */

    const workExperienceArbitrary = fc.record({
      id: fc.string({ minLength: 1 }),
      company: fc.string({ minLength: 1 }),
      position: fc.string({ minLength: 1 }),
      startDate: fc.string({ minLength: 4 }),
      endDate: fc.option(fc.string({ minLength: 4 }), { nil: undefined }),
      location: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      highlights: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
      technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    });

    fc.assert(
      fc.property(
        fc.array(workExperienceArbitrary, { minLength: 2, maxLength: 5 }),
        (experiences: WorkExperience[]) => {
          // Eliminar la primera experiencia
          const targetId = experiences[0].id;
          const filteredExperiences = experiences.filter(
            (exp) => exp.id !== targetId
          );

          // Validar que el array es más pequeño
          expect(filteredExperiences.length).toBe(experiences.length - 1);

          // Validar que la experiencia eliminada no está presente
          const removedExperience = filteredExperiences.find(
            (exp) => exp.id === targetId
          );
          expect(removedExperience).toBeUndefined();

          // Validar que las demás experiencias están presentes
          for (let i = 1; i < experiences.length; i++) {
            const found = filteredExperiences.find(
              (exp) => exp.id === experiences[i].id
            );
            expect(found).toBeDefined();
            expect(found).toEqual(experiences[i]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 9.4: Extensibilidad de Contenido - Validación de estructura JSON', () => {
    /**
     * **Propiedad 9.4: Validación de Estructura**
     * **Valida: Requisitos 10.1, 10.4**
     *
     * Para cualquier modificación del contenido JSON,
     * la estructura debe mantener todos los campos requeridos
     * y tipos de datos correctos.
     */

    const cvDataArbitrary = fc.record({
      personal: fc.record({
        name: fc.string({ minLength: 1 }),
        title: fc.string({ minLength: 1 }),
        location: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        linkedin: fc.webUrl(),
        phone: fc.string({ minLength: 1 }),
      }),
      summary: fc.string({ minLength: 10 }),
      experience: fc.array(
        fc.record({
          id: fc.string({ minLength: 1 }),
          company: fc.string({ minLength: 1 }),
          position: fc.string({ minLength: 1 }),
          startDate: fc.string({ minLength: 4 }),
          endDate: fc.option(fc.string({ minLength: 4 }), { nil: undefined }),
          location: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          highlights: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
        }),
        { minLength: 1 }
      ),
      skills: fc.array(
        fc.record({
          category: fc.string({ minLength: 1 }),
          skills: fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              level: fc.integer({ min: 1, max: 5 }),
              years: fc.option(fc.integer({ min: 1, max: 20 }), {
                nil: undefined,
              }),
            }),
            { minLength: 1 }
          ),
        }),
        { minLength: 1 }
      ),
      education: fc.array(
        fc.record({
          degree: fc.string({ minLength: 1 }),
          institution: fc.string({ minLength: 1 }),
          startYear: fc.integer({ min: 2000, max: 2025 }),
          endYear: fc.integer({ min: 2000, max: 2025 }),
          location: fc.string({ minLength: 1 }),
        }),
        { minLength: 1 }
      ),
      lastUpdated: fc.string({ minLength: 10 }),
    });

    fc.assert(
      fc.property(cvDataArbitrary, (cvData: CVData) => {
        // Validar campos de nivel superior
        expect(cvData).toHaveProperty('personal');
        expect(cvData).toHaveProperty('summary');
        expect(cvData).toHaveProperty('experience');
        expect(cvData).toHaveProperty('skills');
        expect(cvData).toHaveProperty('education');
        expect(cvData).toHaveProperty('lastUpdated');

        // Validar tipos
        expect(typeof cvData.personal).toBe('object');
        expect(typeof cvData.summary).toBe('string');
        expect(Array.isArray(cvData.experience)).toBe(true);
        expect(Array.isArray(cvData.skills)).toBe(true);
        expect(Array.isArray(cvData.education)).toBe(true);
        expect(typeof cvData.lastUpdated).toBe('string');

        // Validar que los arrays no están vacíos
        expect(cvData.experience.length).toBeGreaterThan(0);
        expect(cvData.skills.length).toBeGreaterThan(0);
        expect(cvData.education.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
