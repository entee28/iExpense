import React, { useMemo, useState } from 'react'
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native'
import { Box, Text, FontFamily } from '../atoms'
import { InvalidIndicator, ValidIndicator } from 'assets/icons'
import colors from '../colors'

type Props = {
  left?: JSX.Element
  right?: JSX.Element
  error?: string
  isValid?: boolean
  containerStyle?: ViewStyle
  inputStyle?: StyleProp<TextStyle>
  label?: string | JSX.Element
  labelTestID?: string
  msgTestID?: string
} & FontWeight &
  TextInputProps &
  Pick<TextStyle, 'fontSize' | 'lineHeight' | 'color'>

const INPUT_PADDING_HORIZONTAL = 16
const INPUT_PADDING_VERTICAL = 12

export const TextInput = ({
  left,
  right,
  error,
  isValid,
  containerStyle,
  inputStyle,
  editable,
  label,
  bold,
  semiBold,
  medium,
  extraBold,
  regular,
  fontSize,
  lineHeight,
  color,
  onFocus,
  onBlur,
  msgTestID,
  labelTestID,
  ...inputProps
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
  }, [extraBold, bold, semiBold, medium, regular])

  const rightIndicator = useMemo(() => {
    if (error) {
      return <InvalidIndicator testID="invalid_indicator" />
    }

    if (isValid) {
      return <ValidIndicator testID="valid_indicator" />
    }
  }, [error, isValid])

  const [focused, setFocused] = useState(false)

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false)
    onBlur?.(e)
  }

  return (
    <>
      <View style={containerStyle}>
        {!!label && (
          <Text testID={labelTestID} color={colors.mono100} marginBottom={8}>
            {label}
          </Text>
        )}
        <Box
          borderRadius={8}
          borderColor={focused ? colors.primary80 : colors.mono10}
          backgroundColor={editable === false ? colors.mono5 : colors.white}
          borderWidth={1}
          flexDirection="row"
          alignItems="center"
          width="100%"
          height={48}
          paddingVertical={INPUT_PADDING_VERTICAL}
          testID="text_input.container">
          {!!left && <Box paddingLeft={INPUT_PADDING_HORIZONTAL}>{left}</Box>}

          <RNTextInput
            {...inputProps}
            allowFontScaling={false}
            editable={editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={
              inputProps.placeholderTextColor || colors.mono40
            }
            style={[
              {
                fontFamily,
                fontSize,
                lineHeight,
                color,
                paddingHorizontal: INPUT_PADDING_HORIZONTAL
              },
              {
                flexGrow: 1,
                flexShrink: 1,
                padding: 0
              },
              inputStyle
            ]}
          />

          {!!right && (
            <Box paddingRight={INPUT_PADDING_HORIZONTAL}>{right}</Box>
          )}

          {!!rightIndicator && (
            <Box paddingRight={INPUT_PADDING_HORIZONTAL}>{rightIndicator}</Box>
          )}
        </Box>
      </View>

      {!!error && (
        <Text testID={msgTestID} marginTop={12} color={colors.destructive}>
          {error}
        </Text>
      )}
    </>
  )
}
