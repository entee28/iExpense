import React from 'react'
import {
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

type Props = Pick<
  TouchableOpacityProps,
  'children' | 'disabled' | 'hitSlop' | 'onPress' | 'testID' | 'activeOpacity'
> &
  ViewStyle

export const Pressable = ({
  activeOpacity,
  children,
  disabled,
  hitSlop,
  onPress,
  testID,
  ...styles
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      children={children}
      testID={testID}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={onPress}
      style={styles}
    />
  )
}
