type FontWeight = {
  extraBold?: boolean
  bold?: boolean
  semiBold?: boolean
  medium?: boolean
  regular?: boolean
}

type Category = {
  id: string
  icon: string
  name: string
}

type User = {
  expenseCategories: Category[]
  incomeCategories: Category[]
}
