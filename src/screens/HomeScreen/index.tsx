import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Box, ExpenseItem, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { SCREEN_PADDING_HORIZONTAL } from 'libs/ui/constants'
import { formatNumber } from 'libs/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, SectionList, StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { SectionHeader } from './components'

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
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: insets.bottom === 0 ? 120 : insets.bottom + 100
        }}
        overScrollMode="always">
        <Box alignItems="flex-end">
          <Pressable
            borderRadius={999}
            backgroundColor={colors.primary100}
            width={33}
            height={33}
            alignItems="center"
            justifyContent="center">
            <FontAwesomeIcon icon={faPlus} color={colors.white} size={16} />
          </Pressable>
        </Box>
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
      </ScrollView>
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
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    paddingTop: 24
  }
})
