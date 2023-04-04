import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  KEYCHAIN_KEY_ACCESS_TOKEN,
  STORAGE_USER_ID,
  removeCredentials,
  removeStorage
} from 'libs/storage'
import { merge } from 'lodash'
import { store } from './store'

type UserSliceState = {
  email: string
  name: string
  token: string
  _id: string
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    token: '',
    _id: ''
  } as UserSliceState,
  reducers: {
    saveName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name
    },
    saveAccessToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserSliceState>>) => {
      return merge(state, action.payload)
    },
    clearUser: () => {
      return {
        email: '',
        name: '',
        token: '',
        _id: ''
      }
    }
  }
})

export const { saveName, saveAccessToken, updateUserInfo, clearUser } =
  userSlice.actions
export const userReducer = userSlice.reducer

export const logout = () => {
  // Clear all assets from async storage
  removeStorage(STORAGE_USER_ID)

  // Clear token
  store.dispatch(saveAccessToken({ token: '' }))

  // Clear keychain credentials
  removeCredentials(KEYCHAIN_KEY_ACCESS_TOKEN)

  // Clear user data
  store.dispatch(clearUser())
}
