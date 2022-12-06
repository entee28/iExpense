import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HOME_AMOUNT_OPTIONS } from '../../screens'

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    homeAmountOption: HOME_AMOUNT_OPTIONS.SPENT_THIS_WEEK
  },
  reducers: {
    saveSetting: (
      state,
      action: PayloadAction<{
        homeAmountOption?: HOME_AMOUNT_OPTIONS
      }>
    ) => {
      if (action.payload.homeAmountOption !== undefined) {
        state.homeAmountOption = action.payload.homeAmountOption
      }
    }
  }
})

export const { saveSetting } = settingSlice.actions
export const settingReducer = settingSlice.reducer
