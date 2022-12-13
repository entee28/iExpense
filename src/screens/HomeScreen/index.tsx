import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ExpenseItem, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { SCREEN_PADDING_HORIZONTAL } from 'libs/ui/constants'
import { formatNumber } from 'libs/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppNavigation } from 'libs/navigation'
import { SectionHeader } from './components'
import { useAppSelector } from 'libs/redux'
import { useFocusEffect } from '@react-navigation/native'

const DATA = [
  {
    category: 'Eating out',
    icon: '🍽️',
    amount: 49000,
    currency: '₫'
  },
  {
    category: 'Eating out',
    icon: '🍽️',
    amount: 49000,
    currency: '₫'
  },
  {
    category: 'Eating out',
    icon: '🍽️',
    amount: 49000,
    currency: '₫'
  }
]

export const HomeScreen = () => {
  const { entryList } = useAppSelector(state => state.category)
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const navigation = useAppNavigation()

  const scroll = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    scroll.value = y
  })

  useFocusEffect(() => {
    console.log({ entryList })
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

  const toEntryScreen = () => {
    navigation.navigate('EntryScreen', {})
  }

  return (
    <SafeAreaView style={styles.root}>
      <Animated.View style={[styles.header, headerBorderWidth]}>
        <Animated.Text style={[styles.headerTotal, animatedTextOpacity]}>
          {formatNumber(198000, {
            currency: '₫',
            showCurrency: true,
            decimalCount: 2
          })}
        </Animated.Text>
        <Pressable
          onPress={toEntryScreen}
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
          {t('home_screen.spent_this_week')}
        </Text>
        <Text
          textAlign="center"
          color={colors.mono40}
          bold
          fontSize={48}
          marginBottom={20}>
          {formatNumber(198000, {
            currency: '₫',
            showCurrency: true,
            decimalCount: 2
          })}
        </Text>

        <SectionList
          scrollEnabled={false}
          sections={[
            { title: 'Today', data: DATA, total: 69000 },
            {
              title: 'Yesterday',
              data: DATA,
              total: 69000
            },
            {
              title: '01/01/2077',
              data: DATA,
              total: 69000
            }
          ]}
          renderItem={({ item }) => (
            <ExpenseItem
              amount={item.amount}
              category={item.category}
              currency={item.currency}
              icon={item.icon}
            />
          )}
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} total={section.total} />
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
