import { useMutation } from '@apollo/client'
import { useOnLoginSuccess } from 'libs/hooks'
import { useAppNavigation } from 'libs/navigation'
import { STORAGE_USER_ID, loadStorage, saveStorage } from 'libs/storage'
import {
  Box,
  NavigationBar,
  SCREEN_PADDING_HORIZONTAL,
  SubmitButton,
  Text,
  TextInput,
  showApiError,
  showError,
  showSuccessToast
} from 'libs/ui'
import colors from 'libs/ui/colors'
import { isEmail, isEmpty } from 'libs/utils'
import React, { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { REGISTER, RegisterData, RegisterVariables } from './graphql'

export const RegisterScreen = () => {
  const { t } = useTranslation()
  const onLoginSuccess = useOnLoginSuccess()
  const navigation = useAppNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pinCode, setPinCode] = useState('')

  const [register] = useMutation<RegisterData, RegisterVariables>(REGISTER, {
    onCompleted: async data => {
      const { user, token } = data.createUser

      const userId = await loadStorage(STORAGE_USER_ID)
      if (user?._id && (!userId || userId !== user._id)) {
        saveStorage(STORAGE_USER_ID, user?._id)
      }

      if (token && user._id) {
        onLoginSuccess({
          user,
          access_token: token
        })
      }

      showSuccessToast(`Welcome, ${user?.name}`)
      navigation.navigate('UserProfileScreen')
    },
    onError: error => {
      if (error.graphQLErrors[0].message === 'User already exists') {
        showApiError(error)
      } else {
        showError(t('register_screen.error'))
      }
    }
  })

  const disabled = useMemo(() => {
    return (
      isEmpty(name) ||
      !isEmail(email) ||
      isEmpty(pinCode) ||
      name.length > 200 ||
      email.length > 200
    )
  }, [name, email, pinCode])

  const handleRegister = () => {
    register({
      variables: {
        name,
        email,
        password: pinCode
      }
    })
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <NavigationBar shadow={false} />
      <Box flex={1} paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text
            bold
            fontSize={22}
            lineHeight={32}
            marginTop={12}
            marginBottom={27}>
            {t('register_screen.title')}
          </Text>
          <TextInput
            label={
              <Trans
                t={t}
                i18nKey="register_screen.name"
                components={{
                  destructive: <Text color={colors.destructive} />
                }}
              />
            }
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
          />
          <TextInput
            label={
              <Trans
                t={t}
                i18nKey="register_screen.email"
                components={{
                  destructive: <Text color={colors.destructive} />
                }}
              />
            }
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.input}
            placeholder="johndoe@abc.com"
          />
          <TextInput
            label={
              <Trans
                t={t}
                i18nKey="register_screen.pin"
                components={{
                  destructive: <Text color={colors.destructive} />
                }}
              />
            }
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={pinCode}
            onChangeText={setPinCode}
            containerStyle={styles.input}
          />
        </ScrollView>
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SubmitButton
          disabled={disabled}
          label={t('register_screen.register')}
          onPress={handleRegister}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white
  },
  scrollView: {
    flexGrow: 1
  },
  input: {
    marginVertical: 16
  }
})
