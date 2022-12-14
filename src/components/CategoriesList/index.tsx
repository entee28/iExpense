import {
  faBars,
  faCircleMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFocusEffect } from '@react-navigation/native'
import { useAppNavigation } from 'libs/navigation'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import {
  deleteAccount,
  deleteExpenseCategory,
  deleteIncomeCategory,
  updateCategories
} from 'libs/redux/categorySlice'
import { Box, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { makeEventNotifier } from 'libs/utils'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from 'react-native-draggable-flatlist'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { DeleteWarnModal } from './components'

export const editModeTogglenotifier = makeEventNotifier('OnEditModeToggled')

export const useEditModeToggleListener = (
  listener: typeof editModeTogglenotifier.notify,
  deps: ReadonlyArray<any>
) => {
  editModeTogglenotifier.useEventListener(listener, deps)
}

type Props = {
  type: 'expenses' | 'incomes' | 'accounts'
}

type CategoryMapItem = {
  category: Category[] | undefined
  editOption: 'edit_expense_category' | 'edit_income_category' | 'edit_account'
  createOption: 'new_expense_category' | 'new_income_category' | 'new_account'
}

export const CategoriesList = ({ type }: Props) => {
  const { expenseCategories, incomeCategories, accountList } = useAppSelector(
    state => state.category
  )
  const dispatch = useAppDispatch()

  const categoryMap: Record<typeof type, CategoryMapItem> = {
    expenses: {
      category: expenseCategories,
      editOption: 'edit_expense_category',
      createOption: 'new_expense_category'
    },
    incomes: {
      category: incomeCategories,
      editOption: 'edit_income_category',
      createOption: 'new_income_category'
    },
    accounts: {
      category: accountList,
      editOption: 'edit_account',
      createOption: 'new_account'
    }
  }

  const [data, setData] = useState(categoryMap[type].category)

  //Render updated state when focus screen
  useFocusEffect(() => {
    setData(categoryMap[type].category)
  })

  const [editMode, setEditMode] = useState(false)

  //Listen edit button event from NavBar
  useEditModeToggleListener(() => {
    setEditMode(!editMode)
  }, [editMode])

  const { t } = useTranslation()
  const navigation = useAppNavigation()

  const handlePress = (icon?: string, category?: string, id?: string) => {
    if (icon && category && id) {
      navigation.navigate('CategoryModifyScreen', {
        option: categoryMap[type].editOption,
        icon,
        category,
        id
      })
    } else {
      navigation.navigate('CategoryModifyScreen', {
        option: categoryMap[type].createOption
      })
    }
  }

  //Edit mode animation handle
  const deleteBtnTranslateX = useSharedValue(-32)
  const barsTranslateX = useSharedValue(32)

  useEffect(() => {
    if (!editMode) {
      deleteBtnTranslateX.value = withTiming(-32)
      barsTranslateX.value = withTiming(32)
    } else {
      deleteBtnTranslateX.value = withTiming(0)
      barsTranslateX.value = withTiming(-32)
    }
  }, [editMode])

  const deleteBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: deleteBtnTranslateX.value
        }
      ]
    }
  })

  const barsIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: barsTranslateX.value
        }
      ]
    }
  })

  //Handle modal state
  const [isModalVisible, setIsModalVisible] = useState(false)
  const closeModal = () => {
    setIsModalVisible(false)
  }

  const [selectedItem, setSelectedItem] = useState<Category | null>(null)

  const onDeleteBtnPress = (item: Category) => {
    setIsModalVisible(true)
    setSelectedItem(item)
  }

  const handleDeleteItem = () => {
    switch (type) {
      case 'expenses':
        if (selectedItem) {
          dispatch(
            deleteExpenseCategory({
              id: selectedItem.id
            })
          )
        }
        break

      case 'incomes':
        if (selectedItem) {
          dispatch(
            deleteIncomeCategory({
              id: selectedItem.id
            })
          )
        }
        break

      case 'accounts':
        if (selectedItem) {
          dispatch(
            deleteAccount({
              id: selectedItem.id
            })
          )
        }
        break
    }

    closeModal()
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Category>) => {
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          onPress={() => handlePress(item.icon, item.name, item.id)}
          disabled={isActive}
          paddingLeft={12}>
          <Animated.View
            style={[styles.categoryItemContainer, deleteBtnAnimatedStyle]}>
            <Pressable
              testID={`category_list_item.${item.name}_delete_btn`}
              onPress={() => onDeleteBtnPress(item)}>
              <FontAwesomeIcon
                icon={faCircleMinus}
                color={colors.destructive}
                size={16}
              />
            </Pressable>

            <Box
              borderBottomWidth={StyleSheet.hairlineWidth}
              flex={1}
              borderBottomColor={colors.mono10}
              flexDirection="row"
              alignItems="center"
              transform={[{ translateX: 16 }]}>
              <Box
                width={24}
                height={24}
                justifyContent="center"
                alignItems="center">
                <Text fontSize={20}>{item.icon}</Text>
              </Box>
              <Text marginLeft={12} fontSize={16} lineHeight={32} flex={1}>
                {item.name}
              </Text>
              <Animated.View style={barsIconAnimatedStyle}>
                <FontAwesomeIcon
                  icon={faBars}
                  color={colors.mono40}
                  size={16}
                />
              </Animated.View>
            </Box>
          </Animated.View>
        </Pressable>
      </ScaleDecorator>
    )
  }

  const handleDragEnd = (data: Category[]) => {
    switch (type) {
      case 'expenses':
        dispatch(updateCategories({ expenseCategories: data }))
        break
      case 'incomes':
        dispatch(updateCategories({ incomeCategories: data }))
        break
      case 'accounts':
        dispatch(updateCategories({ accountList: data }))
        break
    }

    setData(data)
  }

  if (!data) {
    return <ActivityIndicator />
  }

  return (
    <>
      <DraggableFlatList
        testID="categories_list.flat_list"
        data={data}
        onDragEnd={({ data }) => handleDragEnd(data)}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 24,
          backgroundColor: colors.white,
          borderRadius: 8,
          marginBottom: 24
        }}
        ListFooterComponent={() => (
          <Pressable
            testID="categories_list.add_category_btn"
            paddingLeft={12}
            onPress={() => handlePress()}>
            <Box
              flexDirection="row"
              alignItems="center"
              paddingVertical={8}
              borderBottomWidth={StyleSheet.hairlineWidth}
              borderBottomColor={colors.mono10}>
              <Box
                width={24}
                height={24}
                justifyContent="center"
                alignItems="center">
                <FontAwesomeIcon icon={faPlus} size={20} />
              </Box>

              <Text marginLeft={12} fontSize={16} lineHeight={32}>
                {type === 'accounts'
                  ? t('categories_list.new_account')
                  : t('categories_list.new_category')}
              </Text>
            </Box>
          </Pressable>
        )}
      />
      <DeleteWarnModal
        categoryName={selectedItem?.name}
        isVisible={isModalVisible}
        closeModal={closeModal}
        onPress={handleDeleteItem}
      />
    </>
  )
}

const styles = StyleSheet.create({
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  }
})
