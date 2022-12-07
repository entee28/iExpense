import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { updateUserInfo } from 'libs/redux/userSlice'
import { Box, NavigationBar, Pressable } from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { v4 as uuidv4 } from 'uuid'

type Props = NativeStackScreenProps<StackParamList, 'CategoryModifyScreen'>

const emojiRegex = /\p{Extended_Pictographic}/u

export const CategoryModifyScreen = ({ navigation, route }: Props) => {
  const { expenseCategories, incomeCategories } = useAppSelector(
    state => state.user
  )
  const dispatch = useAppDispatch()

  const { option, category, icon, id } = route.params
  const { t } = useTranslation()

  const [emoji, setEmoji] = useState(icon || '')
  const [categoryName, setCategoryName] = useState(category || '')

  const categoryNamePlaceholder = useMemo(() => {
    if (option === 'edit_account' || option === 'new_account') {
      return 'category_modify_screen.enter_account'
    }

    return 'category_modify_screen.enter_category'
  }, [option])

  const isDisabled = useMemo(() => {
    if (
      (emoji === icon && categoryName === category) ||
      emoji === '' ||
      categoryName === ''
    ) {
      return true
    }

    return false
  }, [emoji, categoryName])

  const onDonePress = () => {
    switch (option) {
      case 'new_expense_category':
        if (expenseCategories) {
          dispatch(
            updateUserInfo({
              expenseCategories: [
                ...expenseCategories,
                { name: categoryName, icon: emoji, id: uuidv4() }
              ]
            })
          )
        }
        break
      case 'new_income_category':
        if (incomeCategories) {
          dispatch(
            updateUserInfo({
              incomeCategories: [
                ...incomeCategories,
                { name: categoryName, icon: emoji, id: uuidv4() }
              ]
            })
          )
        }
        break
      case 'edit_expense_category':
        dispatch(
          updateUserInfo({
            expenseCategories: expenseCategories?.map(category =>
              category.id === id
                ? { name: categoryName, icon: emoji, id }
                : category
            )
          })
        )
        break
      case 'edit_income_category':
        dispatch(
          updateUserInfo({
            incomeCategories: incomeCategories?.map(category =>
              category.id === id
                ? { name: categoryName, icon: emoji, id }
                : category
            )
          })
        )
        break
    }

    navigation.goBack()
  }

  return (
    <>
      <NavigationBar
        title={t(`category_modify_screen.${option}`)}
        right={
          <Pressable disabled={isDisabled} onPress={onDonePress}>
            <FontAwesomeIcon
              icon={faCheck}
              size={14}
              color={isDisabled ? colors.mono40 : colors.mono100}
            />
          </Pressable>
        }
      />
      <Box flex={1} backgroundColor={colors.white}>
        <TextInput
          onKeyPress={e => {
            if (emojiRegex.test(e.nativeEvent.key)) {
              setEmoji(e.nativeEvent.key)
            }
          }}
          placeholder="🤷‍♂️"
          value={emoji}
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderRadius: 99,
            width: 90,
            height: 90,
            alignSelf: 'center',
            marginTop: 24,
            textAlign: 'center',
            fontSize: 40
          }}
          caretHidden={true}
        />
        <TextInput
          placeholder={t(categoryNamePlaceholder)}
          value={categoryName}
          onChangeText={setCategoryName}
          style={{
            alignSelf: 'center',
            marginTop: 12,
            textAlign: 'center',
            fontSize: 24
          }}
          caretHidden={true}
        />
      </Box>
    </>
  )
}
