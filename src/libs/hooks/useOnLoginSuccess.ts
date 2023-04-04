import { useCallback } from 'react'
import { useAppDispatch } from '../redux'
import { KEYCHAIN_KEY_ACCESS_TOKEN, saveCredentials } from 'libs/storage'
import { saveAccessToken, updateUserInfo } from 'libs/redux/userSlice'

export const useOnLoginSuccess = () => {
  const dispatch = useAppDispatch()

  return useCallback(
    async (payload: {
      access_token?: string
      user: Pick<User, 'name' | 'email' | '_id'>
    }) => {
      const { access_token, user } = payload

      // Set basic user info
      dispatch(
        updateUserInfo({
          email: user.email,
          name: user.name,
          _id: user._id
        })
      )

      // Save access token to keychain and redux store
      if (access_token) {
        dispatch(saveAccessToken({ token: access_token }))
        saveCredentials(user._id, access_token, KEYCHAIN_KEY_ACCESS_TOKEN)
      }
    },
    [dispatch]
  )
}
