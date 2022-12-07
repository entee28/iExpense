import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import {
  defaultExpensesCategories,
  defaultIncomesCategories
} from 'src/constants'

type UserSliceState = Partial<User>

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    expenseCategories: defaultExpensesCategories,
    incomeCategories: defaultIncomesCategories
  } as UserSliceState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserSliceState>) => {
      return merge(state, action.payload)
    },
    updateCategory: (state, action: PayloadAction<UserSliceState>) => {
      if (action.payload.expenseCategories !== undefined) {
        state.expenseCategories = action.payload.expenseCategories
      }

      if (action.payload.incomeCategories !== undefined) {
        state.incomeCategories = action.payload.incomeCategories
      }
    }
  }
})

export const { updateUserInfo, updateCategory } = userSlice.actions
export const userReducer = userSlice.reducer
