type ObjectValues<T> = T[keyof T]

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

type Currency = {
  symbol: string
  name: string
  symbol_native: string
  decimal_digits: number
  rounding: number
  code: string
  name_plural: string
}

type EntryType = 'expense' | 'income' | 'transfer'

type InsightType = 'expense' | 'income'

type Entry = {
  id: string
  fromCategory: Category
  toCategory: Category
  date: string
  amount: number
  note: string
  type: EntryType
}

type InsightBar = {
  barIndex: number
  amount: number
}
