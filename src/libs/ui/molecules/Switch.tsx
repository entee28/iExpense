import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import colors from '../colors'

type Props = {
  value: boolean
  onChange?: (newValue: boolean) => void
  disabled?: boolean
  accessibilityLabel?: string
  trackTestID?: string
}

export const Switch = (props: Props) => {
  const { value, onChange, disabled, accessibilityLabel, trackTestID } = props

  const ballLeft = useRef(
    new Animated.Value(value ? MAX_BALL_LEFT : MIN_BALL_LEFT)
  ).current

  const handlePress = () => {
    onChange?.(!value)
  }

  useEffect(() => {
    Animated.timing(ballLeft, {
      toValue: value ? MAX_BALL_LEFT : MIN_BALL_LEFT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
      easing: Easing.ease
    }).start()
  }, [value, ballLeft])

  const getTrackBackgroundColor = () => {
    if (value && disabled) {
      return colors.primary30
    }

    if (value && !disabled) {
      return colors.primary100
    }

    if (!value && disabled) {
      return colors.mono5
    }

    return colors.mono40
  }

  return (
    <TouchableWithoutFeedback
      testID={accessibilityLabel}
      onPress={disabled ? undefined : handlePress}>
      <Animated.View
        testID={trackTestID}
        style={[
          styles.track,
          {
            backgroundColor: getTrackBackgroundColor()
          }
        ]}>
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                {
                  translateX: ballLeft
                }
              ]
            }
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const ANIMATION_DURATION = 150
const BALL_SIZE = 20
const TRACK_PADDING = 2
const TRACK_HEIGHT = BALL_SIZE + TRACK_PADDING * 2
const TRACK_WIDTH = 40
export const MIN_BALL_LEFT = 0
export const MAX_BALL_LEFT = TRACK_WIDTH - BALL_SIZE - TRACK_PADDING * 2

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: 9999,
    padding: TRACK_PADDING
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: 9999,
    backgroundColor: colors.white
  }
})
