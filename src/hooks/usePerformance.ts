import { useEffect, useCallback, useRef, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export function usePerformance(componentName: string) {
  const startTimeRef = useRef<number | undefined>(undefined);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  });

  // Inicializar tiempo de inicio
  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  // Medir tiempo de renderizado
  useEffect(() => {
    if (startTimeRef.current) {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;

      setMetrics((prev) => ({
        ...prev,
        renderTime,
      }));

      // Log en desarrollo
      if (import.meta.env.DEV) {
        console.log(`[Performance] ${componentName}:`, {
          renderTime: `${renderTime.toFixed(2)}ms`,
        });
      }
    }
  }, [componentName]);

  // Función para medir operaciones específicas
  const measureOperation = useCallback(
    (operationName: string, operation: () => void) => {
      const start = performance.now();
      operation();
      const end = performance.now();

      if (import.meta.env.DEV) {
        console.log(
          `[Performance] ${componentName} - ${operationName}: ${(end - start).toFixed(2)}ms`
        );
      }
    },
    [componentName]
  );

  // Función para reportar métricas de memoria (si está disponible)
  const reportMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (
        performance as unknown as {
          memory: { usedJSHeapSize: number; totalJSHeapSize: number };
        }
      ).memory;

      const memoryUsage = memory.usedJSHeapSize;
      setMetrics((prev) => ({
        ...prev,
        memoryUsage,
      }));

      if (import.meta.env.DEV) {
        console.log(`[Performance] ${componentName} - Memory:`, {
          used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        });
      }
    }
  }, [componentName]);

  return {
    metrics,
    measureOperation,
    reportMemoryUsage,
  };
}

// Hook para debounce de operaciones costosas
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Hook para throttle de eventos frecuentes
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}

// Hook para lazy loading de componentes
export function useLazyComponent<T>(
  importFunction: () => Promise<{ default: T }>
) {
  const componentRef = useRef<T | null>(null);
  const loadingRef = useRef<boolean>(false);

  const loadComponent = useCallback(async () => {
    if (componentRef.current || loadingRef.current) {
      return componentRef.current;
    }

    loadingRef.current = true;
    try {
      const module = await importFunction();
      componentRef.current = module.default;
      return componentRef.current;
    } catch (error) {
      console.error('Error loading lazy component:', error);
      return null;
    } finally {
      loadingRef.current = false;
    }
  }, [importFunction]);

  return {
    component: componentRef.current,
    loadComponent,
    isLoading: loadingRef.current,
  };
}

// Hook para optimización de re-renders
export function useOptimizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  dependencies: unknown[]
): T {
  const callbackRef = useRef<T>(callback);
  const dependenciesRef = useRef(dependencies);

  // Actualizar callback solo si las dependencias cambian
  useEffect(() => {
    const hasChanged = dependencies.some(
      (dep, index) => dep !== dependenciesRef.current[index]
    );

    if (hasChanged) {
      callbackRef.current = callback;
      dependenciesRef.current = dependencies;
    }
  }, [callback, dependencies]);

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as T;
}
