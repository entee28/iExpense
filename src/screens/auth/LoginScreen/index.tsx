import React, { useMemo, useState } from 'react'
import {
  Box,
  NavigationBar,
  SCREEN_PADDING_HORIZONTAL,
  SubmitButton,
  Text,
  TextInput
} from 'libs/ui'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from 'libs/ui/colors'
import { Trans, useTranslation } from 'react-i18next'
import { isEmail, isEmpty } from 'libs/utils'

export const LoginScreen = () => {
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [pinCode, setPinCode] = useState('')

  const disabled = useMemo(() => {
    return isEmail(email) || isEmpty(pinCode) || email.length > 200
  }, [pinCode, email])

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
        </ScrollView>
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SubmitButton
          disabled={disabled}
          label={t('login_screen.title')}
          onPress={() => {}}
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
