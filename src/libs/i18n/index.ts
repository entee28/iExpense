import i18n, {InitOptions} from 'i18next'
import dayjs from 'dayjs'
import {saveStorage, STORAGE_KEY_LANGUAGE} from 'libs/storage'
import {initReactI18next} from 'react-i18next'
import defaultResourceEn from './en.json'
import defaultResourceVi from './vi.json'

enum Language {
  VI = 'vi',
  EN = 'en'
}

const resources = {
  vi: {
    translation: defaultResourceVi
  },
  en: {
    translation: defaultResourceEn
  }
}

const INIT_OPTIONS: InitOptions = {
  compatibilityJSON: 'v3',
  lng: Language.EN,
  resources,
  keySeparator: '.',
  nsSeparator: false,
  interpolation: {
    escapeValue: false
  }
}

i18n.use(initReactI18next).init(INIT_OPTIONS)

/**
 * Handle change language: setup to i18next and cache language information to AsyncStorage.
 * @param lang Language to change
 */
export const changeLanguage = async (lang: Language) => {
  i18n.changeLanguage(lang)
  dayjs.locale(lang)
  saveStorage(STORAGE_KEY_LANGUAGE, lang)
}

export default i18n
