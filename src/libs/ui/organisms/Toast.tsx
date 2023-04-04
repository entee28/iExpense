import React from 'react'
import { StyleSheet } from 'react-native'
import { ApolloError } from '@apollo/client'
import Toast, {
  ToastConfig,
  ToastConfigParams,
  BaseToast,
  BaseToastProps
} from 'react-native-toast-message'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import colors from 'libs/ui/colors'
import i18n from 'libs/i18n'

export const toastConfig: ToastConfig = {
  baseToast: ({ ...toastMessageProps }: ToastConfigParams<BaseToastProps>) => {
    const { props: customProps } = toastMessageProps
    return (
      <BaseToast
        {...toastMessageProps}
        renderLeadingIcon={customProps.renderLeadingIcon}
        style={[styles.toastContainer, customProps.style]}
        text1NumberOfLines={5}
        contentContainerStyle={[
          styles.content,
          customProps.renderLeadingIcon && styles.paddingLeft,
          customProps.contentContainerStyle
        ]}
        text1Style={[styles.toastText, customProps.text1Style]}
        text1Props={{ allowFontScaling: false }}
        text2Props={{ allowFontScaling: false }}
      />
    )
  }
}

/**
 * Toast a error
 * @param message Error message to toast
 */
export const showError = (message: string) => {
  Toast.show({
    text1: message,
    type: 'baseToast',
    position: 'bottom',
    props: {
      renderLeadingIcon: () => (
        <FontAwesomeIcon icon={faXmarkCircle} color={colors.white} />
      )
    }
  })
}

export const showApiError = (error: ApolloError) => {
  if (!error.graphQLErrors?.[0]?.message) return

  Toast.show({
    text1: i18n.t(error.graphQLErrors[0].message),
    type: 'baseToast',
    position: 'bottom',
    props: {
      renderLeadingIcon: () => (
        <FontAwesomeIcon icon={faXmarkCircle} color={colors.white} />
      )
    }
  })
}

export const showSuccessToast = (msg: string) => {
  Toast.show({
    text1: msg,
    type: 'baseToast',
    position: 'bottom',
    props: {
      renderLeadingIcon: () => (
        <FontAwesomeIcon icon={faCircleCheck} color={colors.white} />
      )
    }
  })
}

export const showToast = (msg: string) => {
  Toast.show({
    text1: msg,
    type: 'baseToast',
    position: 'bottom'
  })
}

export default Toast

const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 16,
    backgroundColor: colors.mono80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: undefined,
    height: undefined,
    maxWidth: '90%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderLeftWidth: 0
  },
  content: {
    paddingHorizontal: 0,
    flex: 0,
    maxWidth: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  toastText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 22,
    fontFamily: 'Muli-Regular',
    fontWeight: 'normal'
  },
  paddingLeft: {
    paddingLeft: 8
  }
})
