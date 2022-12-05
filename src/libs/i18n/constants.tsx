import { FlagEN, FlagVN } from 'assets/icons'
import React from 'react'

export enum Language {
  VI = 'vi',
  EN = 'en'
}

export const LANGUAGE_FLAG_MAP: Record<Language, JSX.Element> = {
  [Language.VI]: <FlagVN />,
  [Language.EN]: <FlagEN />
}

export const LANGUAGE_LABEL_MAP: Record<Language, string> = {
  [Language.VI]: 'Tiếng Việt',
  [Language.EN]: 'English'
}
