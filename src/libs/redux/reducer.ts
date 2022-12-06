import { combineReducers } from '@reduxjs/toolkit'
import { settingReducer } from './settingSlice'

export const rootReducer = combineReducers({
  setting: settingReducer
})
