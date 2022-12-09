import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import { HOME_AMOUNT_OPTIONS } from 'src/constants'
import currencies from 'src/constants/currencies.json'

type CurrencySliceState = {
  homeAmountOption: HOME_AMOUNT_OPTIONS
  primaryCurrency: Currency
  secondaryCurrency: Currency | null
  primarySymbol: boolean
  secondarySymbol: boolean
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    homeAmountOption: HOME_AMOUNT_OPTIONS.SPENT_THIS_WEEK,
    primaryCurrency: currencies.VND,
    secondaryCurrency: null,
    primarySymbol: true,
    secondarySymbol: true
  } as CurrencySliceState,
  reducers: {
    saveSetting: (
      state,
      action: PayloadAction<Partial<CurrencySliceState>>
    ) => {
      return merge(state, action.payload)
    },
    swapCurrency: state => {
      if (state.secondaryCurrency) {
        let temp = state.primaryCurrency
        state.primaryCurrency = state.secondaryCurrency
        state.secondaryCurrency = temp
      }
    },
    togglePrimarySymbol: state => {
      state.primarySymbol = !state.primarySymbol
    },
    toggleSecondarySymbol: state => {
      state.secondarySymbol = !state.secondarySymbol
    }
  }
})

export const {
  saveSetting,
  swapCurrency,
  togglePrimarySymbol,
  toggleSecondarySymbol
} = settingSlice.actions
export const settingReducer = settingSlice.reducer
