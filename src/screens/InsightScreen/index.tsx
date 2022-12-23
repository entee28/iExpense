import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useGetHomeData } from 'libs/hooks'
import { useAppSelector } from 'libs/redux'
import { Box, Pressable, SCREEN_PADDING_HORIZONTAL, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { formatNumber } from 'libs/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme
} from 'victory-native'
import { useGetInsightData } from '../../libs/hooks/useGetInsightData'
import { InsightChart } from './components'

export const InsightScreen = () => {
  const { primaryCurrency, primarySymbol } = useAppSelector(
    state => state.setting
  )
  const { weekSpent } = useGetHomeData()
  const { data: DATA } = useGetInsightData()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const CURRENCY = primarySymbol ? primaryCurrency.symbol : primaryCurrency.code

  const scroll = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    scroll.value = y
  })

  const headerBorderWidth = useAnimatedStyle(() => {
    const borderBottomWidth = interpolate(
      scroll.value,
      [-2000, 0, 55, 2000],
      [0, 0, 0.5, 0.5]
    )

    return {
      borderBottomWidth
    }
  })

  const animatedTextOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [-2000, 70, 130, 2000],
      [0, 0, 1, 1]
    )

    return {
      opacity
    }
  })

  return (
    <SafeAreaView style={styles.root}>
      <Animated.View style={[styles.header, headerBorderWidth]}>
        <Animated.Text style={[styles.headerTotal, animatedTextOpacity]}>
          {formatNumber(weekSpent, {
            currency: CURRENCY,
            showCurrency: true,
            decimalCount: 2
          })}
        </Animated.Text>
        <Pressable
          testID="home_screen.add_btn"
          borderRadius={999}
          borderWidth={2}
          borderColor={colors.primary100}
          backgroundColor={colors.white}
          width={33}
          height={33}
          alignItems="center"
          justifyContent="center">
          <FontAwesomeIcon
            icon={faEllipsis}
            color={colors.primary100}
            size={16}
          />
        </Pressable>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: insets.bottom === 0 ? 120 : insets.bottom + 100
        }}
        overScrollMode="always">
        <Box marginTop={-12} paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
          <Text bold fontSize={36}>
            {formatNumber(weekSpent, {
              currency: CURRENCY,
              showCurrency: true,
              decimalCount: 2
            })}
          </Text>
          <Text fontSize={16} bold color={colors.mono40}>
            {t('home_amount_screen.SPENT_THIS_WEEK')}
          </Text>
        </Box>
        <InsightChart data={DATA} weekSpent={weekSpent} />
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    borderBottomColor: colors.mono40
  },
  headerTotal: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 33,
    flex: 1,
    color: colors.mono100
  }
})
