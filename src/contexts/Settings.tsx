import type { Direction } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { __DEV__ } from 'config';
import { DatePickerLocaleText } from 'constants/locale';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import createAppTheme from 'theme';
import type { FCC } from 'types/react';
import DateTime from 'utils/DateTime';
import LocalStorage from 'utils/LocalStorage';

// Init Dayjs locale
DateTime.initLocale();

interface Settings {
  direction?: Direction;
  mode: 'light' | 'dark' | 'default';
  language: 'vi' | 'en';
}

export interface SettingsContextValue {
  settings: Settings;
  updateSettings: (update: Settings) => void;
}

const initialSettings: Settings = {
  direction: 'ltr',
  mode: 'light',
  language: 'vi',
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

if (__DEV__) {
  SettingsContext.displayName = 'SettingsContext';
}

const SettingsProvider: FCC = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultMode = isDarkMode ? 'dark' : 'light';
  const { i18n } = useTranslation();

  useEffect(() => {
    const settings = LocalStorage.get('settings', initialSettings);
    if (Object.keys(settings).every((key) => key in initialSettings)) {
      setSettings(settings);
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(settings.language);
  }, [settings.language, i18n]);

  const updateSettings = useCallback((updatedSettings: Settings): void => {
    setSettings(updatedSettings);
    LocalStorage.set('settings', updatedSettings);
  }, []);

  const theme = useMemo(() => {
    const { mode } = settings;
    return createAppTheme({
      ...settings,
      mode: mode === 'default' ? defaultMode : mode,
    });
  }, [settings, defaultMode]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={DatePickerLocaleText}
          adapterLocale={settings.language}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

const SettingsConsumer = SettingsContext.Consumer;
export { SettingsContext as default, SettingsProvider, SettingsConsumer };
