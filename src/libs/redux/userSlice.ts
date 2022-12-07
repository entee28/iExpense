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
    }
  }
})

export const { updateUserInfo } = userSlice.actions
export const userReducer = userSlice.reducer
