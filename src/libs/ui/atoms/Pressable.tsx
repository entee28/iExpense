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
  | 'onLongPress'
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
  onLongPress,
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
      onLongPress={onLongPress}
      style={[styles, style]}
    />
  )
}
