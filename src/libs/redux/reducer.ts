import { combineReducers } from '@reduxjs/toolkit'
import { settingReducer } from './settingSlice'
import { categoryReducer } from './categorySlice'

export const rootReducer = combineReducers({
  setting: settingReducer,
  category: categoryReducer
})
