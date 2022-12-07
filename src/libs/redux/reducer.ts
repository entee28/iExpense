import { combineReducers } from '@reduxjs/toolkit'
import { settingReducer } from './settingSlice'
import { userReducer } from './userSlice'

export const rootReducer = combineReducers({
  setting: settingReducer,
  user: userReducer
})
