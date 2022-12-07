import {
  faBars,
  faCircleMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { updateUserInfo } from 'libs/redux/userSlice'
import { Box, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
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
import { useEditModeToggleListener } from '..'

type Props = {
  type: 'expenses' | 'incomes'
}

export const CategoriesList = ({ type }: Props) => {
  const { expenseCategories, incomeCategories } = useAppSelector(
    state => state.user
  )
  const dispatch = useAppDispatch()

  const [data, setData] = useState(
    type === 'expenses' ? expenseCategories : incomeCategories
  )

  //Render updated state when focus screen
  useFocusEffect(() => {
    setData(type === 'expenses' ? expenseCategories : incomeCategories)
  })

  const [editMode, setEditMode] = useState(false)

  //Listen edit button event from NavBar
  useEditModeToggleListener(() => {
    setEditMode(!editMode)
  }, [editMode])

  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const handlePress = (icon?: string, category?: string, id?: string) => {
    if (icon && category && id) {
      navigation.navigate('CategoryModifyScreen', {
        option:
          type === 'expenses'
            ? 'edit_expense_category'
            : 'edit_income_category',
        icon,
        category,
        id
      })
    } else {
      navigation.navigate('CategoryModifyScreen', {
        option:
          type === 'expenses' ? 'new_expense_category' : 'new_income_category'
      })
    }
  }

  const deleteBtnTranslateX = useSharedValue(-32)
  const barsTranslateX = useSharedValue(32)

  useEffect(() => {
    if (!editMode && type) {
      deleteBtnTranslateX.value = withTiming(-32)
      barsTranslateX.value = withTiming(32)
    } else {
      deleteBtnTranslateX.value = withTiming(0)
      barsTranslateX.value = withTiming(-32)
    }
  }, [editMode, type])

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
            <FontAwesomeIcon
              icon={faCircleMinus}
              color={colors.destructive}
              size={16}
            />
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
    if (type === 'expenses') {
      dispatch(updateUserInfo({ expenseCategories: data }))
    } else {
      dispatch(updateUserInfo({ incomeCategories: data }))
    }

    setData(data)
  }

  if (!data) {
    return <ActivityIndicator />
  }

  return (
    <DraggableFlatList
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
        <Pressable paddingLeft={12} onPress={() => handlePress()}>
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
              {t('categories_screen.new')}
            </Text>
          </Box>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  }
})
