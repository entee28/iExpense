import { useAppSelector } from 'libs/redux'
import {
  BottomSheet,
  BottomSheetMethods,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { CategoryItem } from './CategoryItem'

type Props = {
  type: 'from' | 'to'
  closeSheet: () => void
  setEntryType: (type: EntryType) => void
  setSelectedAccount: (account: Category) => void
  setSelectedCategory: (category: Category) => void
}

export const CategoryPicker = forwardRef<BottomSheetMethods, Props>(
  (props, ref) => {
    const {
      type,
      closeSheet,
      setEntryType,
      setSelectedAccount,
      setSelectedCategory
    } = props
    const { accountList, expenseCategories, incomeCategories } = useAppSelector(
      state => state.category
    )
    const { t } = useTranslation()

    const handleModifyCategory = (entryType: EntryType, category: Category) => {
      if (type === 'from') {
        setSelectedAccount(category)
      } else {
        setSelectedCategory(category)
        setEntryType(entryType)
      }

      closeSheet()
    }

    const renderExpenseItem = ({ item }: { item: Category }) => {
      return (
        <CategoryItem
          icon={item.icon}
          name={item.name}
          onPress={() => handleModifyCategory('expense', item)}
        />
      )
    }
    const renderIncomeItem = ({ item }: { item: Category }) => {
      return (
        <CategoryItem
          icon={item.icon}
          name={item.name}
          onPress={() => handleModifyCategory('income', item)}
        />
      )
    }
    const renderAccountItem = ({ item }: { item: Category }) => {
      return (
        <CategoryItem
          icon={item.icon}
          name={item.name}
          onPress={() => handleModifyCategory('transfer', item)}
        />
      )
    }

    return (
      <BottomSheet
        index={0}
        ref={ref}
        snapPoints={type === 'from' ? ['25%'] : ['50%']}>
        <ScrollView
          testID="category_picker.scroll_view"
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          {type === 'to' && (
            <>
              <Text
                textTransform="uppercase"
                color={colors.mono60}
                lineHeight={24}
                bold
                marginTop={8}
                textAlign={'center'}>
                {t('entry_screen.expense')}
              </Text>
              <FlatList
                scrollEnabled={false}
                data={expenseCategories}
                numColumns={4}
                renderItem={renderExpenseItem}
              />

              <Text
                textTransform="uppercase"
                color={colors.mono60}
                lineHeight={24}
                bold
                marginTop={8}
                textAlign={'center'}>
                {t('entry_screen.income')}
              </Text>
              <FlatList
                scrollEnabled={false}
                data={incomeCategories}
                numColumns={4}
                renderItem={renderIncomeItem}
              />
            </>
          )}
          <Text
            color={colors.mono60}
            lineHeight={24}
            bold
            marginTop={8}
            textAlign={'center'}>
            {t('entry_screen.accounts')}
          </Text>
          <FlatList
            scrollEnabled={false}
            data={accountList}
            numColumns={4}
            renderItem={renderAccountItem}
          />
        </ScrollView>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    flex: 1,
    paddingBottom: 24
  }
})
