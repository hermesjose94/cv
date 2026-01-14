import { useTranslation } from 'react-i18next';

export interface NavigationSection {
  id: string;
  label: string;
}

export function useNavigation(): NavigationSection[] {
  const { t } = useTranslation();

  return [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'education', label: t('nav.education') },
    { id: 'contact', label: t('nav.contact') },
  ];
}
