import React, { useMemo } from 'react'
import {
  TextProps as RNTextProps,
  TextStyle,
  Text as RNText
} from 'react-native'
import colors from '../colors'

export type TextProps = {
  children?: React.ReactNode
  testID?: string
  accessibilityLabel?: string
  textProps?: RNTextProps
} & TextStyle &
  FontWeight

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
  lineHeight,
  color = colors.mono100,
  textAlign = 'auto',
  extraBold,
  bold,
  semiBold,
  medium,
  regular,
  testID,
  accessibilityLabel,
  ...styles
}: TextProps) => {
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
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...textProps}
      style={[{ color, textAlign, lineHeight, fontSize, fontFamily }, styles]}>
      {children}
    </RNText>
  )
}
