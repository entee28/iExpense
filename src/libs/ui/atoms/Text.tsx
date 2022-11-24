import React, { useMemo } from 'react'
import { TextProps, TextStyle, Text as RNText } from 'react-native'
import colors from '../colors'

type Props = {
  children?: React.ReactNode
  textProps?: TextProps
  extraBold?: boolean
  bold?: boolean
  semiBold?: boolean
  medium?: boolean
  regular?: boolean
} & TextStyle

export enum FontFamily {
  extraBold = 'Nunito-ExtraBold',
  bold = 'Nunito-Bold',
  medium = 'Nunito-Medium',
  semiBold = 'Nunito-SemiBold',
  regular = 'Nunito-Regular'
}

export const Text = ({
  textProps,
  children,
  fontSize = 14,
  lineHeight = 22,
  color = colors.mono100,
  textAlign = 'auto',
  extraBold,
  bold,
  semiBold,
  medium,
  regular,
  ...styles
}: Props) => {
  const fontFamily = useMemo(() => {
    if (extraBold) {
      return FontFamily.extraBold
    }
    if (bold) {
      return FontFamily.bold
    }
    if (semiBold) {
      return FontFamily.semiBold
    }
    if (medium) {
      return FontFamily.medium
    }
    if (regular) {
      return FontFamily.regular
    }
    return FontFamily.regular
  }, [extraBold, bold, semiBold, medium, regular])

  return (
    <RNText
      {...textProps}
      style={[{ color, textAlign, lineHeight, fontSize, fontFamily }, styles]}>
      {children}
    </RNText>
  )
}
