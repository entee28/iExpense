import * as Keychain from 'react-native-keychain'

/**
 * Sava credentials to keychain on IOS and keystore on Android
 * @param username Username
 * @param token Token: access token, refresh token ...
 * @param service Service name
 * @param biometrics: If `biometrics = true`, the data in the keychain can only be accessed by biometrics, `biometrics = false` otherwise
 * @returns Return `Keychain.Result` or `false` in case of an error
 */
export const saveCredentials = async (
  username: string,
  token: string,
  service: string,
  biometrics: boolean = false
): Promise<false | Keychain.Result> => {
  try {
    let result
    if (!biometrics) {
      result = await Keychain.setGenericPassword(username, token, {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        service
      })
    } else {
      result = await Keychain.setGenericPassword(username, token, {
        service,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY
      })
    }
    return result
  } catch (error) {
    return false
  }
}

/**
 * Retrieve the credentials from secure storage.
 * @param service Service name to retrieve credentials from secure storage
 * @authenticationPrompt configure for authentication prompt
 * @returns Return password credentials or false if no credentials or error occurred.
 */
export const getCredentials = async (
  service: string,
  authenticationPrompt: Keychain.AuthenticationPrompt = {
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    cancel: 'cancel1 '
  }
): Promise<string | false> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service,
      authenticationPrompt
    })
    if (credentials) {
      return credentials.password
    }
    return false
  } catch (error) {
    return false
  }
}

/**
 *
 * @param service Service name to remove from secure storage
 * @returns Return true if remove credentials successful or false otherwise
 */
export const removeCredentials = async (service: string): Promise<boolean> => {
  try {
    const credentials = await Keychain.resetGenericPassword({ service })
    return credentials
  } catch (error) {
    return false
  }
}
