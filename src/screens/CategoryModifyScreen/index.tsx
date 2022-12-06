import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, NavigationBar, Pressable } from 'libs/ui'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import colors from 'libs/ui/colors'
import { TextInput } from 'react-native'

type Props = NativeStackScreenProps<StackParamList, 'CategoryModifyScreen'>

const emojiRegex = /\p{Extended_Pictographic}/u

export const CategoryModifyScreen = ({ navigation, route }: Props) => {
  const { option, category, icon } = route.params
  const { t } = useTranslation()

  const [emoji, setEmoji] = useState(icon || '')
  const [categoryName, setCategoryName] = useState(category || '')

  const categoryNamePlaceholder = useMemo(() => {
    if (option === 'edit_account' || option === 'new_account') {
      return 'category_modify_screen.enter_account'
    }

    return 'category_modify_screen.enter_category'
  }, [option])

  const onDonePress = () => {
    navigation.goBack()
  }

  return (
    <>
      <NavigationBar
        title={t(`category_modify_screen.${option}`)}
        right={
          <Pressable onPress={onDonePress}>
            <FontAwesomeIcon icon={faCheck} size={14} color={colors.mono100} />
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
