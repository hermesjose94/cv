import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi available globally
(globalThis as typeof globalThis & { vi: typeof vi }).vi = vi;
