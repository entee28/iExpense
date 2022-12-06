import {
  Box,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text,
  TextProps
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { NavigationState, SceneRendererProps } from 'react-native-tab-view'

type Props = TextProps &
  SceneRendererProps & {
    navigationState: NavigationState<{
      key: string
      title: string
    }>
    setIndex: React.Dispatch<React.SetStateAction<number>>
    style?: StyleProp<ViewStyle>
    fixedItemWidth?: number
  }

export const TabBar = (props: Props) => {
  const {
    setIndex,
    navigationState: { index, routes },
    style,
    fixedItemWidth,
    ...textProps
  } = props

  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      paddingBottom={10}
      paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
      viewProps={{ style }}>
      {routes.map((route, i) => {
        const active = index === i

        return (
          <Pressable
            key={route.key}
            style={[
              styles.item,
              i > 0 && styles.itemSpacing,
              active && styles.activeItem
            ]}
            onPress={() => setIndex(i)}>
            <Text
              textAlign="center"
              semiBold
              color={active ? colors.primary100 : colors.mono40}
              textProps={textProps}>
              {route.title}
            </Text>
          </Pressable>
        )
      })}
    </Box>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  itemSpacing: {
    marginLeft: 8
  },
  activeItem: {
    backgroundColor: colors.primary10
  }
})
