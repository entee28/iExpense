import i18n, { InitOptions } from 'i18next'
import dayjs from 'dayjs'
import { loadStorage, saveStorage, STORAGE_KEY_LANGUAGE } from 'libs/storage'
import { initReactI18next } from 'react-i18next'
import defaultResourceEn from './en.json'
import defaultResourceVi from './vi.json'
import { Language } from './constants'

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
  },
  returnNull: false
}

i18n.use(initReactI18next).init(INIT_OPTIONS)

const loadResources = async () => {
  try {
    const lang =
      ((await loadStorage(STORAGE_KEY_LANGUAGE)) as Language) || Language.EN
    i18n.changeLanguage(lang)
    dayjs.locale(lang)
  } catch (error) {
    console.error(error)
    i18n.reloadResources(Language.EN)
    i18n.changeLanguage(Language.EN)
  }
}

// Run load resources when startup app
loadResources()

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
