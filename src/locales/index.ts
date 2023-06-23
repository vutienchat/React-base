import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en';
import vi from './languages/vi';

i18n.use(initReactI18next).init({
  returnNull: false,
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
