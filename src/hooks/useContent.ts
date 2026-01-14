import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentService } from '../services/contentService';
import type { CVData, SupportedLanguage } from '../types/cv.types';

interface UseContentResult {
  content: CVData | null;
  loading: boolean;
  error: string | null;
  language: SupportedLanguage;
  switchLanguage: (newLanguage: SupportedLanguage) => void;
}

export function useContent(): UseContentResult {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Normalize language code to supported languages (en-US -> en, es-ES -> es)
  const normalizeLanguage = (lang: string): SupportedLanguage => {
    const baseLang = lang.split('-')[0].toLowerCase();
    return (baseLang === 'en' ? 'en' : 'es') as SupportedLanguage;
  };

  const currentLanguage = normalizeLanguage(i18n.language || 'es');

  const switchLanguage = (newLanguage: SupportedLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  // Load content when language changes
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ContentService.loadContent(currentLanguage);

        if (isMounted) {
          setContent(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load content'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentLanguage]);

  return {
    content,
    loading,
    error,
    language: currentLanguage,
    switchLanguage,
  };
}
