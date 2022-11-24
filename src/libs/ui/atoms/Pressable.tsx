import React from 'react'
import {
  ViewStyle,
  Pressable as RNPressable,
  PressableProps
} from 'react-native'

type Props = Pick<
  PressableProps,
  | 'children'
  | 'delayLongPress'
  | 'disabled'
  | 'hitSlop'
  | 'onLongPress'
  | 'onPress'
  | 'onPressIn'
  | 'onPressOut'
  | 'testOnly_pressed'
  | 'testID'
> &
  ViewStyle

export const Pressable = ({
  children,
  delayLongPress,
  disabled,
  hitSlop,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  testOnly_pressed,
  testID,
  ...styles
}: Props) => {
  return (
    <RNPressable
      children={children}
      testID={testID}
      delayLongPress={delayLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      testOnly_pressed={testOnly_pressed}
      style={styles}
    />
  )
}
