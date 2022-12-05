import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { changeLanguage } from 'libs/i18n'
import i18n from 'libs/i18n'
import {
  Language,
  LANGUAGE_FLAG_MAP,
  LANGUAGE_LABEL_MAP
} from 'libs/i18n/constants'
import {
  Box,
  SCREEN_PADDING_HORIZONTAL,
  Text,
  Pressable,
  NavigationBar
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

export const LanguageScreen = () => {
  const { t } = useTranslation()

  const handleLanguagePress = (lng: Language) => {
    changeLanguage(lng)
  }

  return (
    <>
      <NavigationBar title={t('language_screen.title')} />
      <Box
        flex={1}
        paddingTop={12}
        backgroundColor={colors.white}
        paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
        <Pressable
          style={styles.button}
          onPress={() => handleLanguagePress(Language.EN)}>
          {LANGUAGE_FLAG_MAP[Language.EN]}
          <Text fontWeight="600" marginLeft={12} flex={1}>
            {LANGUAGE_LABEL_MAP[Language.EN]}
          </Text>
          {i18n.language === 'en' && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={colors.primary100}
              size={16}
            />
          )}
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => handleLanguagePress(Language.VI)}>
          {LANGUAGE_FLAG_MAP[Language.VI]}
          <Text fontWeight="600" marginLeft={12} flex={1}>
            {LANGUAGE_LABEL_MAP[Language.VI]}
          </Text>
          {i18n.language === 'vi' && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={colors.primary100}
              size={16}
            />
          )}
        </Pressable>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary5,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
