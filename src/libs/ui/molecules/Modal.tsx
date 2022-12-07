import React, { FC } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN_PADDING_HORIZONTAL } from '../constants'

export type ModalProps = {
  containerStyle?: ViewStyle
} & Partial<RNModalProps>

export const Modal: FC<ModalProps> = ({
  containerStyle,
  children,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <RNModal
      {...props}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
      style={[
        styles.modal,
        {
          paddingTop: top + SCREEN_PADDING_HORIZONTAL,
          paddingBottom: bottom + SCREEN_PADDING_HORIZONTAL,
          paddingHorizontal: SCREEN_PADDING_HORIZONTAL
        },
        containerStyle
      ]}>
      {children}
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center'
  }
})
