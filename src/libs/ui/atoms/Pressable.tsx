import React from 'react'
import {
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

export type PressableProps = Pick<
  TouchableOpacityProps,
  | 'children'
  | 'disabled'
  | 'hitSlop'
  | 'onPress'
  | 'testID'
  | 'activeOpacity'
  | 'style'
> &
  ViewStyle

export const Pressable = ({
  activeOpacity,
  children,
  disabled,
  hitSlop,
  onPress,
  testID,
  style,
  ...styles
}: PressableProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      children={children}
      testID={testID}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={onPress}
      style={[styles, style]}
    />
  )
}
