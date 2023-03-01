import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  useGetMonthInsightData,
  useGetSummaryAmount,
  useGetWeekInsightData
} from 'libs/hooks'
import { useAppSelector } from 'libs/redux'
import {
  BottomSheetMethods,
  Box,
  ExpenseItem,
  FontFamily,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import { formatNumber } from 'libs/utils'
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { InsightChart, ModeSelectorSheet } from './components'

export const InsightScreen = () => {
  const { primaryCurrency, primarySymbol } = useAppSelector(
    state => state.setting
  )
  const { weekSpent, weekIncome, monthSpent, monthIncome } =
    useGetSummaryAmount()
  const [mode, setMode] = useState<InsightType>('expense')
  const [insightDuration, setInsightDuration] = useState<'week' | 'month'>(
    'week'
  )
  const { chartData: WEEK_CHART, weekData } = useGetWeekInsightData(mode)
  const { chartData: MONTH_CHART, monthData } = useGetMonthInsightData(mode)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const CURRENCY = primarySymbol ? primaryCurrency.symbol : primaryCurrency.code

  const DATA = useMemo(() => {
    if (insightDuration === 'week') {
      return {
        amount: mode === 'expense' ? weekSpent : weekIncome,
        title:
          mode === 'expense'
            ? 'home_amount_screen.SPENT_THIS_WEEK'
            : 'home_amount_screen.REVENUE_THIS_WEEK',
        chartData: WEEK_CHART,
        listData: weekData
      }
    }

    return {
      amount: mode === 'expense' ? monthSpent : monthIncome,
      title:
        mode === 'expense'
          ? 'home_amount_screen.SPENT_THIS_MONTH'
          : 'home_amount_screen.REVENUE_THIS_MONTH',
      chartData: MONTH_CHART,
      listData: monthData
    }
  }, [insightDuration, mode, weekIncome, weekSpent])

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

  const modeSelectorRef = useRef<BottomSheetMethods>(null)

  const handleOpenSheet = () => {
    modeSelectorRef.current?.present()
  }
  const handleCloseSheet = () => {
    modeSelectorRef.current?.close()
  }

  return (
    <SafeAreaView style={styles.root}>
      <Animated.View style={[styles.header, headerBorderWidth]}>
        <Animated.Text style={[styles.headerTotal, animatedTextOpacity]}>
          {formatNumber(DATA.amount, {
            currency: CURRENCY,
            showCurrency: true,
            decimalCount: 2
          })}
        </Animated.Text>
        <Pressable
          onPress={handleOpenSheet}
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
            {formatNumber(DATA.amount, {
              currency: CURRENCY,
              showCurrency: true,
              decimalCount: 2
            })}
          </Text>
          <Text fontSize={16} bold color={colors.mono40}>
            {t(DATA.title)}
          </Text>
        </Box>
        <InsightChart
          type={insightDuration}
          data={DATA.chartData}
          amount={DATA.amount}
        />
        <Box flexDirection="row" paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
          <Pressable
            borderWidth={insightDuration === 'week' ? 0.75 : 0}
            borderRadius={8}
            borderColor={colors.mono10}
            paddingHorizontal={12}
            paddingVertical={8}
            marginRight={12}
            onPress={() => setInsightDuration('week')}>
            <Text
              fontSize={16}
              color={insightDuration === 'week' ? colors.mono80 : colors.mono40}
              bold>
              {t('insight_screen.week')}
            </Text>
          </Pressable>
          <Pressable
            borderWidth={insightDuration === 'month' ? 0.75 : 0}
            borderRadius={8}
            borderColor={colors.mono10}
            paddingHorizontal={12}
            paddingVertical={8}
            onPress={() => setInsightDuration('month')}>
            <Text
              fontSize={16}
              color={
                insightDuration === 'month' ? colors.mono80 : colors.mono40
              }
              bold>
              {t('insight_screen.month')}
            </Text>
          </Pressable>
        </Box>
        <Box paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
          {DATA.listData.map(category => (
            <ExpenseItem
              icon={category.category.icon}
              amount={category.total}
              category={category.category.name}
              key={category.category.id}
              currency={CURRENCY}
              type="expense"
              count={category.count}
              onPress={() => {}}
            />
          ))}
        </Box>
        <ModeSelectorSheet
          currentMode={mode}
          setMode={setMode}
          closeSheet={handleCloseSheet}
          ref={modeSelectorRef}
        />
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
    fontFamily: FontFamily.bold,
    paddingLeft: 33,
    flex: 1,
    color: colors.mono100
  }
})
