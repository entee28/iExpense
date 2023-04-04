import { gql } from '@apollo/client'

export type UpdateUserData = {
  updateUser: {
    user: {
      _id: string
    }
  }
}

export type UpdateUserDataVariables = {
  userId: string
  incomeCategories: Category[]
  expenseCategories: Category[]
  accountList: Category[]
  entryList: Entry[]
  primaryCurrency: Currency
  secondaryCurrency?: Currency
}

export const UPDATE_USER = gql`
  mutation Mutation(
    $userId: ID!
    $incomeCategories: [CategoryInput]
    $expenseCategories: [CategoryInput]
    $accountList: [CategoryInput]
    $entryList: [EntryInput]
    $primaryCurrency: CurrencyInput
    $secondaryCurrency: CurrencyInput
  ) {
    updateUser(
      id: $userId
      user: {
        incomeCategories: $incomeCategories
        expenseCategories: $expenseCategories
        accountList: $accountList
        entryList: $entryList
        primaryCurrency: $primaryCurrency
        secondaryCurrency: $secondaryCurrency
      }
    ) {
      _id
    }
  }
`

export type DownloadUserData = {
  user: Pick<
    User,
    | 'entryList'
    | 'accountList'
    | 'expenseCategories'
    | 'incomeCategories'
    | 'primaryCurrency'
    | 'secondaryCurrency'
  >
}

export type DownloadUserDataVariables = {
  userId: string
}

export const GET_USER_DATA = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      secondaryCurrency {
        symbol_native
        symbol
        rounding
        name_plural
        name
        decimal_digits
        code
      }
      primaryCurrency {
        name
        symbol
        symbol_native
        decimal_digits
        rounding
        code
        name_plural
      }
      incomeCategories {
        id
        icon
        name
      }
      expenseCategories {
        id
        icon
        name
      }
      entryList {
        id
        date
        amount
        note
        type
        toCategory {
          id
          icon
          name
        }
        fromCategory {
          id
          icon
          name
        }
      }
      accountList {
        id
        icon
        name
      }
    }
  }
`
