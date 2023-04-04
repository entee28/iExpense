import { combineReducers } from '@reduxjs/toolkit'
import { settingReducer } from './settingSlice'
import { categoryReducer } from './categorySlice'
import { userReducer } from './userSlice'

export const rootReducer = combineReducers({
  setting: settingReducer,
  category: categoryReducer,
  user: userReducer
})
