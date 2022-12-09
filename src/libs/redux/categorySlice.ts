import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import {
  defaultAccountList,
  defaultExpensesCategories,
  defaultIncomesCategories
} from 'src/constants'

type CategorySliceState = {
  expenseCategories: Category[]
  incomeCategories: Category[]
  accountList: Category[]
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    expenseCategories: defaultExpensesCategories,
    incomeCategories: defaultIncomesCategories,
    accountList: defaultAccountList
  } as CategorySliceState,
  reducers: {
    updateCategories: (
      state,
      action: PayloadAction<Partial<CategorySliceState>>
    ) => {
      return merge(state, action.payload)
    },
    createExpenseCategory: (state, action: PayloadAction<Category>) => {
      state.expenseCategories = [...state.expenseCategories, action.payload]
    },
    createIncomeCategory: (state, action: PayloadAction<Category>) => {
      state.incomeCategories = [...state.incomeCategories, action.payload]
    },
    createAccount: (state, action: PayloadAction<Category>) => {
      state.accountList = [...state.accountList, action.payload]
    },
    updateExpenseCategory: (
      state,
      action: PayloadAction<{ id: string; updatedCategory: Category }>
    ) => {
      state.expenseCategories = state.expenseCategories.map(category =>
        category.id === action.payload.id
          ? action.payload.updatedCategory
          : category
      )
    },
    updateIncomeCategory: (
      state,
      action: PayloadAction<{ id: string; updatedCategory: Category }>
    ) => {
      state.incomeCategories = state.incomeCategories.map(category =>
        category.id === action.payload.id
          ? action.payload.updatedCategory
          : category
      )
    },
    updateAccount: (
      state,
      action: PayloadAction<{ id: string; updatedAccount: Category }>
    ) => {
      state.accountList = state.accountList.map(category =>
        category.id === action.payload.id
          ? action.payload.updatedAccount
          : category
      )
    },
    deleteExpenseCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.expenseCategories = state.expenseCategories.filter(
        category => category.id !== action.payload.id
      )
    },
    deleteIncomeCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.incomeCategories = state.incomeCategories.filter(
        category => category.id !== action.payload.id
      )
    },
    deleteAccount: (state, action: PayloadAction<{ id: string }>) => {
      state.accountList = state.accountList.filter(
        category => category.id !== action.payload.id
      )
    }
  }
})

export const {
  updateCategories,
  createAccount,
  createExpenseCategory,
  createIncomeCategory,
  updateAccount,
  updateExpenseCategory,
  updateIncomeCategory,
  deleteAccount,
  deleteExpenseCategory,
  deleteIncomeCategory
} = categorySlice.actions
export const categoryReducer = categorySlice.reducer
