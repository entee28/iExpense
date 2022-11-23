import React, { useMemo } from 'react'
import { TextProps, TextStyle, Text as RNText } from 'react-native'
import colors from '../colors'

type Props = {
  children?: React.ReactNode
  textProps?: TextProps
} & TextStyle &
  GetFontFamilyParams

export enum SupportedFontFamily {
  MULI = 'muli',
  NUNITO = 'nunito'
}

type SupportedFontStyle = {
  extraBold?: string
  bold?: string
  semiBold?: string
  medium?: string
  regular?: string
}

type GetFontFamilyParams = {
  useFontFamily?: SupportedFontFamily
  extraBold?: boolean
  bold?: boolean
  semiBold?: boolean
  medium?: boolean
  regular?: boolean
}

export const Text = ({
  textProps,
  children,
  fontSize = 14,
  lineHeight = 22,
  color = colors.mono100,
  textAlign = 'auto',
  useFontFamily = SupportedFontFamily.NUNITO,
  extraBold,
  bold,
  semiBold,
  medium,
  regular,
  ...styles
}: Props) => {
  const fontFamily = useMemo(() => {
    return getFontFamily({
      extraBold,
      bold,
      semiBold,
      medium,
      regular,
      useFontFamily
    })
  }, [extraBold, bold, semiBold, medium, regular, useFontFamily])

  return (
    <RNText
      {...textProps}
      style={[{ color, textAlign, lineHeight, fontSize, fontFamily }, styles]}>
      {children}
    </RNText>
  )
}

//#region Get font family
const supportedFontFamily: { [fontFamily: string]: SupportedFontStyle } = {
  muli: {
    extraBold: 'Muli-ExtraBold',
    bold: 'Muli-Bold',
    medium: 'Muli-Medium',
    regular: 'Muli-Regular'
  },
  nunito: {
    extraBold: 'Nunito-ExtraBold',
    bold: 'Nunito-Bold',
    medium: 'Nunito-Medium',
    semiBold: 'Nunito-SemiBold',
    regular: 'Nunito-Regular'
  }
}

const getFontFamily = (params: GetFontFamilyParams) => {
  const {
    bold,
    extraBold,
    medium,
    regular,
    semiBold,
    useFontFamily = SupportedFontFamily.NUNITO
  } = params

  const family = supportedFontFamily[useFontFamily]
  if (!family) {
    return supportedFontFamily[0].regular
  }
  if (extraBold && family.extraBold) {
    return family.extraBold
  }
  if (bold && family.bold) {
    return family.bold
  }
  if (semiBold && family.semiBold) {
    return family.semiBold
  }
  if (medium && family.medium) {
    return family.medium
  }
  if (regular && family.regular) {
    return family.regular
  }
  return family.regular
}
