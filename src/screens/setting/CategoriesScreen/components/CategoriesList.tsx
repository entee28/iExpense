import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Box, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from 'react-native-draggable-flatlist'
import {
  defaultExpensesCategories,
  defaultIncomesCategories
} from 'src/constants'

type Props = {
  type: 'expenses' | 'incomes'
}

export const CategoriesList = ({ type }: Props) => {
  const [data, setData] = useState(
    type === 'expenses' ? defaultExpensesCategories : defaultIncomesCategories
  )

  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const handlePress = (icon?: string, category?: string) => {
    if (icon && category) {
      navigation.navigate('CategoryModifyScreen', {
        option:
          type === 'expenses'
            ? 'edit_expense_category'
            : 'edit_income_category',
        icon,
        category
      })
    } else {
      navigation.navigate('CategoryModifyScreen', {
        option:
          type === 'expenses' ? 'new_expense_category' : 'new_income_category'
      })
    }
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Category>) => {
    return (
      <ScaleDecorator>
        <Pressable onLongPress={drag} disabled={isActive} paddingLeft={12}>
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
              <Text fontSize={20}>{item.icon}</Text>
            </Box>
            <Text marginLeft={12} fontSize={16} lineHeight={32}>
              {item.name}
            </Text>
          </Box>
        </Pressable>
      </ScaleDecorator>
    )
  }

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
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
