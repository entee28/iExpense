import React from 'react'
import { Box, NavigationBar, Pressable } from 'libs/ui'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import colors from 'libs/ui/colors'
import { CategoriesList, editModeTogglenotifier } from 'src/components'

export const AccountListScreen = () => {
  const { t } = useTranslation()

  const handleToggleEditMode = () => {
    editModeTogglenotifier.notify()
  }

  return (
    <>
      <NavigationBar
        title={t('setting_screen.accounts')}
        right={
          <Pressable onPress={handleToggleEditMode}>
            <FontAwesomeIcon icon={faPen} size={14} color={colors.mono100} />
          </Pressable>
        }
        transparent
      />
      <Box paddingTop={12}>
        <CategoriesList type="accounts" />
      </Box>
    </>
  )
}
