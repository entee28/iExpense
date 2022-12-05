import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from 'libs/ui/colors'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem, Text } from 'libs/ui'
import { SCREEN_PADDING_HORIZONTAL } from 'libs/ui/constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faBars,
  faBell,
  faCircleHalfStroke,
  faCoins,
  faCreditCard,
  faDollarSign,
  faLanguage,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { loadStorage, STORAGE_KEY_LANGUAGE } from 'libs/storage'
import { Language, LANGUAGE_LABEL_MAP } from 'libs/i18n/constants'
import { useCurrentLanguage } from 'libs/hooks'

export const SettingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const lang = useCurrentLanguage()

  const handlePress = (label: string) => {
    switch (label) {
      case 'setting_screen.appearance':
        break
      case 'setting_screen.noti':
        break
      case 'setting_screen.currencies':
        break
      case 'setting_screen.lang':
        navigation.navigate('LanguageScreen')
        break
      case 'setting_screen.accounts':
        break
      case 'setting_screen.categories':
        break
    }
  }

  const ITEMS = [
    {
      label: 'setting_screen.appearance',
      sub_label: 'System',
      icon: (
        <FontAwesomeIcon
          icon={faCircleHalfStroke}
          size={16}
          color={colors.primary100}
        />
      )
    },
    {
      label: 'setting_screen.noti',
      sub_label: 'Every Evening',
      icon: (
        <FontAwesomeIcon icon={faBell} size={16} color={colors.primary100} />
      )
    },
    {
      label: 'setting_screen.currencies',
      icon: (
        <FontAwesomeIcon
          icon={faDollarSign}
          size={16}
          color={colors.primary100}
        />
      )
    },
    {
      label: 'setting_screen.lang',
      sub_label: LANGUAGE_LABEL_MAP[lang],
      icon: (
        <FontAwesomeIcon
          icon={faLanguage}
          size={16}
          color={colors.primary100}
        />
      )
    },
    {
      label: 'break'
    },
    {
      label: 'setting_screen.accounts',
      icon: (
        <FontAwesomeIcon
          icon={faCreditCard}
          size={16}
          color={colors.primary100}
        />
      )
    },
    {
      label: 'setting_screen.categories',
      icon: (
        <FontAwesomeIcon icon={faBars} size={16} color={colors.primary100} />
      )
    },
    {
      label: 'setting_screen.home_amount',
      sub_label: 'Spent this month',
      icon: (
        <FontAwesomeIcon icon={faCoins} size={16} color={colors.primary100} />
      )
    },
    {
      label: 'break'
    },
    {
      label: 'setting_screen.user',
      icon: (
        <FontAwesomeIcon icon={faUser} size={16} color={colors.primary100} />
      )
    }
  ]

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container}>
        <Text fontSize={16} lineHeight={24} bold textAlign="center">
          {t('setting_screen.settings')}
        </Text>
        <Box paddingTop={24}>
          {ITEMS.map((item, index) =>
            item.label === 'break' ? (
              <Box key={`break_${index}`} height={12} />
            ) : (
              <MenuItem
                icon={item.icon}
                key={item.label}
                marginBottom={8}
                label={
                  <Box
                    flex={1}
                    flexDirection="row"
                    paddingRight={4}
                    justifyContent="space-between"
                    alignItems="center"
                    marginLeft={12}>
                    <Text lineHeight={22}>{t(item.label)}</Text>
                    {typeof item.sub_label === 'string' ? (
                      <Text color={colors.primary100}>{t(item.sub_label)}</Text>
                    ) : (
                      item.sub_label
                    )}
                  </Box>
                }
                onPress={() => handlePress(item.label)}
              />
            )
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    paddingTop: 12
  }
})
