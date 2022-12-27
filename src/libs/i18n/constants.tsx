import { FlagEN, FlagVN } from 'assets/icons'
import React from 'react'

export const Language = {
  VI: 'vi',
  EN: 'en'
} as const
export type Language = ObjectValues<typeof Language>

export const LANGUAGE_FLAG_MAP: Record<Language, JSX.Element> = {
  [Language.VI]: <FlagVN />,
  [Language.EN]: <FlagEN />
}

export const LANGUAGE_LABEL_MAP: Record<Language, string> = {
  [Language.VI]: 'Tiếng Việt',
  [Language.EN]: 'English'
}
