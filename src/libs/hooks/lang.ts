import { useState } from 'react'
import { Language } from '../i18n/constants'
import { loadStorage, STORAGE_KEY_LANGUAGE } from '../storage'

export const useCurrentLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.EN)
  loadStorage(STORAGE_KEY_LANGUAGE).then(value => {
    setCurrentLanguage(value as Language)
  })

  return currentLanguage
}
