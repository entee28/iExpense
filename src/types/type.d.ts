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
