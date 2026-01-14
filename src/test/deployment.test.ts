import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import fc from 'fast-check';

describe('Deployment Configuration Properties', () => {
  test('Property 8: Despliegue Automático - Configuración de GitHub Actions', () => {
    /**
     * **Propiedad 8: Despliegue Automático**
     * **Valida: Requisitos 8.2**
     *
     * Para cualquier configuración de despliegue válida,
     * el workflow de GitHub Actions debe incluir todas las
     * validaciones necesarias y configuración correcta.
     */

    // Verificar que el archivo de workflow existe
    const workflowPath = join(process.cwd(), '.github/workflows/deploy.yml');
    expect(existsSync(workflowPath)).toBe(true);

    // Leer el contenido del workflow
    const workflowContent = readFileSync(workflowPath, 'utf-8');

    // Validar que contiene los jobs necesarios
    expect(workflowContent).toContain('validate');
    expect(workflowContent).toContain('build');
    expect(workflowContent).toContain('deploy');

    // Validar que incluye todas las validaciones
    expect(workflowContent).toContain('pnpm lint');
    expect(workflowContent).toContain('pnpm format:check');
    expect(workflowContent).toContain('pnpm type-check');
    expect(workflowContent).toContain('pnpm test');
    expect(workflowContent).toContain('pnpm build');

    // Validar configuración de Node.js
    expect(workflowContent).toContain('node-version-file');
    expect(workflowContent).toContain('.nvmrc');

    // Validar configuración de pnpm
    expect(workflowContent).toContain('pnpm/action-setup');

    // Validar configuración de GitHub Pages
    expect(workflowContent).toContain('actions/configure-pages');
    expect(workflowContent).toContain('actions/upload-pages-artifact');
    expect(workflowContent).toContain('actions/deploy-pages');

    // Validar que el despliegue solo ocurre en push a main o master
    expect(workflowContent).toMatch(
      /github\.ref == 'refs\/heads\/(main|master)'/
    );
    expect(workflowContent).toContain("github.ref == 'refs/heads/main'");
    expect(workflowContent).toContain("github.ref == 'refs/heads/master'");
  });

  test('Property 8.1: Configuración de Vite para GitHub Pages', () => {
    /**
     * **Propiedad 8.1: Configuración de Base Path**
     * **Valida: Requisitos 8.1, 8.4**
     *
     * Para cualquier entorno de ejecución (desarrollo/producción),
     * Vite debe usar el base path correcto.
     */

    const viteConfigPath = join(process.cwd(), 'vite.config.ts');
    expect(existsSync(viteConfigPath)).toBe(true);

    const viteConfig = readFileSync(viteConfigPath, 'utf-8');

    // Validar que usa base path raíz
    expect(viteConfig).toContain("base: '/'");

    // Validar configuración de build
    expect(viteConfig).toContain("outDir: 'dist'");
  });

  test('Property 8.2: Scripts de package.json requeridos', () => {
    /**
     * **Propiedad 8.2: Scripts Necesarios**
     * **Valida: Requisitos 8.2**
     *
     * Para cualquier proyecto desplegable,
     * package.json debe incluir todos los scripts
     * necesarios para validación y build.
     */

    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    const requiredScripts = [
      'dev',
      'build',
      'lint',
      'format:check',
      'type-check',
      'test',
    ];

    fc.assert(
      fc.property(fc.constantFrom(...requiredScripts), (scriptName) => {
        expect(packageJson.scripts).toHaveProperty(scriptName);
        expect(typeof packageJson.scripts[scriptName]).toBe('string');
        expect(packageJson.scripts[scriptName].length).toBeGreaterThan(0);
      }),
      { numRuns: requiredScripts.length }
    );
  });

  test('Property 8.3: Configuración de Node.js y pnpm', () => {
    /**
     * **Propiedad 8.3: Requisitos de Entorno**
     * **Valida: Requisitos 1.1, 1.2**
     *
     * Para cualquier entorno de ejecución,
     * el proyecto debe especificar versiones correctas
     * de Node.js y pnpm.
     */

    // Verificar .nvmrc
    const nvmrcPath = join(process.cwd(), '.nvmrc');
    expect(existsSync(nvmrcPath)).toBe(true);

    const nvmrcContent = readFileSync(nvmrcPath, 'utf-8').trim();
    const nodeVersion = parseInt(nvmrcContent.split('.')[0]);
    expect(nodeVersion).toBeGreaterThanOrEqual(22);

    // Verificar engines en package.json
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    expect(packageJson.engines).toBeDefined();
    expect(packageJson.engines.node).toBeDefined();
    expect(packageJson.engines.pnpm).toBeDefined();

    // Validar que Node.js es >= 22
    expect(packageJson.engines.node).toMatch(/>=\s*22/);

    // Validar que pnpm es >= 8
    expect(packageJson.engines.pnpm).toMatch(/>=\s*[89]/);
  });

  test('Property 8.4: Estructura de archivos de despliegue', () => {
    /**
     * **Propiedad 8.4: Archivos de Configuración**
     * **Valida: Requisitos 8.1, 8.2, 8.4**
     *
     * Para cualquier proyecto desplegable,
     * deben existir todos los archivos de configuración
     * necesarios.
     */

    const requiredFiles = [
      '.github/workflows/deploy.yml',
      'vite.config.ts',
      'package.json',
      '.nvmrc',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
    ];

    fc.assert(
      fc.property(fc.constantFrom(...requiredFiles), (filePath) => {
        const fullPath = join(process.cwd(), filePath);
        expect(existsSync(fullPath)).toBe(true);
      }),
      { numRuns: requiredFiles.length }
    );
  });

  test('Property 8.5: Validación de permisos de GitHub Actions', () => {
    /**
     * **Propiedad 8.5: Permisos de Workflow**
     * **Valida: Requisitos 8.2**
     *
     * Para cualquier workflow de despliegue a GitHub Pages,
     * deben estar configurados los permisos correctos.
     */

    const workflowPath = join(process.cwd(), '.github/workflows/deploy.yml');
    const workflowContent = readFileSync(workflowPath, 'utf-8');

    // Validar permisos necesarios para GitHub Pages
    expect(workflowContent).toContain('permissions:');
    expect(workflowContent).toContain('contents: read');
    expect(workflowContent).toContain('pages: write');
    expect(workflowContent).toContain('id-token: write');

    // Validar configuración de concurrencia
    expect(workflowContent).toContain('concurrency:');
    expect(workflowContent).toMatch(/group:\s*['"]pages['"]/);
  });

  test('Property 8.6: Validación de triggers del workflow', () => {
    /**
     * **Propiedad 8.6: Triggers de Workflow**
     * **Valida: Requisitos 8.2**
     *
     * Para cualquier workflow de CI/CD,
     * debe ejecutarse en push a main y en pull requests.
     */

    const workflowPath = join(process.cwd(), '.github/workflows/deploy.yml');
    const workflowContent = readFileSync(workflowPath, 'utf-8');

    // Validar triggers
    expect(workflowContent).toContain('on:');
    expect(workflowContent).toContain('push:');
    expect(workflowContent).toContain('branches:');
    expect(workflowContent).toContain('- main');
    expect(workflowContent).toContain('- master');
    expect(workflowContent).toContain('pull_request:');
  });
});
