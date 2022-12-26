import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useGetHomeData } from 'libs/hooks'
import { useAppNavigation } from 'libs/navigation'
import { useAppSelector } from 'libs/redux'
import { ExpenseItem, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { SCREEN_PADDING_HORIZONTAL } from 'libs/ui/constants'
import { formatNumber } from 'libs/utils'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { HOME_AMOUNT_OPTIONS } from 'src/constants'
import { useGetSummaryAmount } from 'libs/hooks'
import { SectionHeader } from './components'

export const HomeScreen = () => {
  const { primaryCurrency, primarySymbol, homeAmountOption } = useAppSelector(
    state => state.setting
  )
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const navigation = useAppNavigation()
  const DATA = useGetHomeData()
  const {
    weekSpent,
    weekDiff,
    weekIncome,
    monthDiff,
    monthIncome,
    monthSpent
  } = useGetSummaryAmount()
  const CURRENCY = primarySymbol ? primaryCurrency.symbol : primaryCurrency.code

  const homeAmount = useMemo(() => {
    if (homeAmountOption === HOME_AMOUNT_OPTIONS.PROFIT_LOSS_THIS_MONTH) {
      return {
        amount: monthDiff,
        title: 'home_amount_screen.PROFIT_LOSS_THIS_MONTH'
      }
    }
    if (homeAmountOption === HOME_AMOUNT_OPTIONS.PROFIT_LOSS_THIS_WEEK) {
      return {
        amount: weekDiff,
        title: 'home_amount_screen.PROFIT_LOSS_THIS_WEEK'
      }
    }
    if (homeAmountOption === HOME_AMOUNT_OPTIONS.REVENUE_THIS_MONTH) {
      return {
        amount: monthIncome,
        title: 'home_amount_screen.REVENUE_THIS_MONTH'
      }
    }
    if (homeAmountOption === HOME_AMOUNT_OPTIONS.REVENUE_THIS_WEEK) {
      return {
        amount: weekIncome,
        title: 'home_amount_screen.REVENUE_THIS_WEEK'
      }
    }
    if (homeAmountOption === HOME_AMOUNT_OPTIONS.SPENT_THIS_MONTH) {
      return {
        amount: monthSpent,
        title: 'home_amount_screen.SPENT_THIS_MONTH'
      }
    }
    return {
      amount: weekSpent,
      title: 'home_amount_screen.SPENT_THIS_WEEK'
    }
  }, [homeAmountOption, DATA])

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

  const toEntryScreen = (entry?: Entry) => {
    navigation.navigate('EntryScreen', {
      entry
    })
  }

  return (
    <SafeAreaView style={styles.root}>
      <Animated.View style={[styles.header, headerBorderWidth]}>
        <Animated.Text style={[styles.headerTotal, animatedTextOpacity]}>
          {formatNumber(homeAmount.amount, {
            currency: CURRENCY,
            showCurrency: true,
            decimalCount: 2
          })}
        </Animated.Text>
        <Pressable
          testID="home_screen.add_btn"
          onPress={() => toEntryScreen()}
          borderRadius={999}
          backgroundColor={colors.primary100}
          width={33}
          height={33}
          alignItems="center"
          justifyContent="center">
          <FontAwesomeIcon icon={faPlus} color={colors.white} size={16} />
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
        <Text
          textAlign="center"
          color={colors.mono40}
          bold
          fontSize={20}
          lineHeight={32}
          marginTop={24}>
          {t(homeAmount.title)}
        </Text>
        <Text
          textProps={{
            adjustsFontSizeToFit: true,
            numberOfLines: 1
          }}
          textAlign="center"
          color={colors.mono40}
          bold
          fontSize={48}
          marginBottom={20}>
          {formatNumber(homeAmount.amount, {
            currency: CURRENCY,
            showCurrency: true,
            decimalCount: 2
          })}
        </Text>

        <SectionList
          scrollEnabled={false}
          sections={DATA}
          renderItem={({ item }) => (
            <ExpenseItem
              type={item.type}
              amount={item.amount}
              category={item.toCategory.name}
              currency={CURRENCY}
              icon={item.toCategory.icon}
              onPress={() => toEntryScreen(item)}
            />
          )}
          renderSectionHeader={({ section }) => (
            <SectionHeader
              currency={CURRENCY}
              title={section.title}
              total={section.total}
            />
          )}
          keyExtractor={(_, index) => `basicListEntry-${index}`}
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
    backgroundColor: colors.white,
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL
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
