import React from 'react'
import {
  Box,
  MenuItem,
  NavigationBar,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import { useTranslation } from 'react-i18next'
import colors from 'libs/ui/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppNavigation } from 'libs/navigation'

export const UserProfileScreen = () => {
  const { t } = useTranslation()
  const navigation = useAppNavigation()

  return (
    <>
      <NavigationBar title={t('setting_screen.user')} />
      <Box
        flex={1}
        backgroundColor={colors.white}
        paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
        paddingTop={12}>
        <MenuItem
          icon={
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              size={16}
              color={colors.primary100}
            />
          }
          marginBottom={8}
          label={
            <Box
              flex={1}
              flexDirection="row"
              paddingRight={4}
              justifyContent="space-between"
              alignItems="center">
              <Text lineHeight={22}>{t('user_profile_screen.login')}</Text>
            </Box>
          }
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </Box>
    </>
  )
}
