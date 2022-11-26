import React, { useMemo } from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Text, Pressable, TextProps, PressableProps } from '../atoms'
import colors from '../colors'

export interface ButtonProps extends PressableProps {
  variation?: 'primary' | 'secondary' | 'tertiary'
  label: string
  style?: ViewStyle
  onPress: () => void
  labelStyle?: TextStyle
  labelProps?: TextProps
  backgroundColor?: string
}

export const Button = ({
  variation = 'primary',
  label,
  style,
  onPress,
  labelStyle,
  labelProps,
  backgroundColor: _backgroundColor,
  testID,
  ...props
}: ButtonProps) => {
  const [backgroundColor, labelColor] = useMemo(() => {
    if (props.disabled) {
      return [colors.mono5, colors.mono40]
    }

    if (variation === 'secondary') {
      return [colors.primary10, colors.primary100]
    }

    if (variation === 'tertiary') {
      return [colors.transparent, colors.primary100]
    }
    return [colors.primary100, colors.white]
  }, [variation, props.disabled])

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: _backgroundColor || backgroundColor },
        style
      ]}
      onPress={onPress}
      testID={testID}
      {...props}>
      <Text
        semiBold
        textAlign="center"
        textProps={{
          ...labelProps
        }}
        color={labelColor}
        {...labelStyle}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8
  }
})
