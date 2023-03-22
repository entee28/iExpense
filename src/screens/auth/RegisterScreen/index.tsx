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

export const RegisterScreen = () => {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pinCode, setPinCode] = useState('')

  const disabled = useMemo(() => {
    return (
      isEmpty(name) ||
      isEmail(email) ||
      isEmpty(pinCode) ||
      name.length > 200 ||
      email.length > 200
    )
  }, [name, email, pinCode])

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
