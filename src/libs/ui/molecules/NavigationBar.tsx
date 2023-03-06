import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { NAVBAR_HEIGHT } from 'libs/ui/constants'
import { getWidth } from 'libs/utils'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Pressable, Text } from '../atoms'
import colors from '../colors'

type Props = {
  left?: JSX.Element | null
  right?: JSX.Element
  title?: string | JSX.Element
  shadow?: boolean
  leftStyle?: StyleProp<ViewStyle>
  rightStyle?: StyleProp<ViewStyle>
  transparent?: boolean
  backgroundColor?: string
  color?: string
  onBack?: () => void
  border?: boolean
  style?: StyleProp<ViewStyle>
  testIDScreen?: string
}

const SIDE_WIDTH = 90

export const NavigationBar = ({
  left,
  right,
  title,
  leftStyle,
  rightStyle,
  shadow = false,
  onBack,
  backgroundColor = colors.white,
  transparent = false,
  color = colors.mono100,
  testIDScreen = '',
  border,
  style
}: Props) => {
  const { top } = useSafeAreaInsets()

  const navigation = useNavigation()

  const goBack = () => {
    onBack ? onBack() : navigation.goBack()
  }

  return (
    <View
      testID={`navigation_bar.${testIDScreen}`}
      style={[
        styles.root,
        shadow && styles.shadow,
        border && styles.border,
        {
          paddingTop: top,
          height: NAVBAR_HEIGHT + top,
          backgroundColor: transparent ? 'transparent' : backgroundColor
        },
        style
      ]}>
      <View style={[styles.left, leftStyle]}>
        {left !== undefined ? (
          left
        ) : (
          <Pressable
            testID="navigation_bar.left"
            onPress={goBack}
            style={styles.backButton}>
            <FontAwesomeIcon icon={faChevronLeft} size={14} color={color} />
          </Pressable>
        )}
      </View>

      <View style={styles.center}>
        {typeof title === 'string' ? (
          <Text
            testID={`navigation_bar.${testIDScreen}_title`}
            bold
            fontSize={16}
            lineHeight={24}
            textAlign="center"
            color={color}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>

      <View style={[styles.right, rightStyle]}>{right}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  left: {
    width: SIDE_WIDTH,
    alignItems: 'flex-start',
    paddingLeft: 24,
    height: '100%',
    justifyContent: 'center'
  },
  right: {
    width: SIDE_WIDTH,
    alignItems: 'flex-end',
    paddingRight: 24,
    height: '100%',
    justifyContent: 'center'
  },
  center: {
    width: getWidth(100) - 2 * SIDE_WIDTH,
    height: '100%',
    justifyContent: 'center'
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.primary100,
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  backButton: {
    paddingHorizontal: 6,
    paddingVertical: 4
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mono10
  }
})
