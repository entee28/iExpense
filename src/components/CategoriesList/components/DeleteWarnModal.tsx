import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import colors from 'libs/ui/colors'
import { Box, Button, Link, Modal, ModalProps, Text } from 'libs/ui'

type Props = ModalProps & {
  closeModal: () => void
  onPress: () => void
  categoryName?: string
}

export const DeleteWarnModal = ({
  isVisible,
  closeModal,
  onPress,
  categoryName
}: Props) => {
  const { t } = useTranslation()

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <Box
        backgroundColor={colors.white}
        padding={24}
        borderRadius={16}
        justifyContent="center">
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          marginBottom={16}
          bold>
          {t('categories_screen.modal_title', {
            category: categoryName
          })}
        </Text>
        <Text textAlign="center" marginBottom={32} color={colors.mono80}>
          {t('categories_screen.modal_content')}
        </Text>
        <Button
          onPress={onPress}
          label={t('categories_screen.delete')}
          style={styles.logout_btn}
          labelStyle={styles.white_text}
        />
        <Box padding={12} marginTop={8} alignItems="center">
          <Link label={t('categories_screen.cancel')} onPress={closeModal} />
        </Box>
      </Box>
    </Modal>
  )
}

const styles = StyleSheet.create({
  logout_btn: {
    backgroundColor: colors.destructive
  },
  white_text: {
    color: colors.white
  }
})
