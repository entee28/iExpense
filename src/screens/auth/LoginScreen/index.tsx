import { ApolloError, useMutation } from '@apollo/client'
import {
  Box,
  Link,
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
import { LOG_IN, LogInData, LogInVariables } from './graphql'
import { STORAGE_USER_ID, loadStorage, saveStorage } from 'libs/storage'
import { useOnLoginSuccess } from 'libs/hooks'
import { useAppNavigation } from 'libs/navigation'

export const LoginScreen = () => {
  const { t } = useTranslation()
  const onLoginSuccess = useOnLoginSuccess()
  const navigation = useAppNavigation()

  const [email, setEmail] = useState('')
  const [pinCode, setPinCode] = useState('')

  const disabled = useMemo(() => {
    return !isEmail(email) || isEmpty(pinCode) || email.length > 200
  }, [pinCode, email])

  const [logIn] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: async data => {
      const { user, token } = data.login
      const userId = await loadStorage(STORAGE_USER_ID)
      if (user?._id && (!userId || user._id !== userId)) {
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
    onError: (error: ApolloError) => {
      if (error.message) {
        showApiError(error)
      } else {
        showError(t('login_screen.error'))
      }
      console.log(error)
    }
  })

  const handleLogIn = () => {
    logIn({
      variables: {
        email,
        password: pinCode
      }
    })
  }

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen')
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
            {t('login_screen.title')}
          </Text>
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
          <Link
            label={t('login_screen.no_account')}
            onPress={navigateToRegister}
          />
        </ScrollView>
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SubmitButton
          disabled={disabled}
          label={t('login_screen.title')}
          onPress={handleLogIn}
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
