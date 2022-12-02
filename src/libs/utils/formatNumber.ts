export type FormatNumberOptions = {
  minDecimalCount?: number
  maxDecimalCount?: number
  decimalCount?: number
  showSign?: 'only-negative' | 'only-positive' | 'always' | 'never'
  showCurrency?: boolean
  // Sign to show for zero value if showSign is 'always'
  signOnZero?: 'negative' | 'positive'
  currency?: string
}

export const formatNumber = (amount: number, options?: FormatNumberOptions) => {
  const {
    decimalCount,
    minDecimalCount,
    maxDecimalCount,
    showSign = 'only-negative',
    showCurrency = false,
    signOnZero,
    currency = '₫'
  } = options || {}

  if (isNaN(amount)) {
    return 'NaN'
  }

  const formatter = Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDecimalCount || decimalCount || 0,
    maximumFractionDigits:
      maxDecimalCount || (decimalCount ?? (showCurrency ? 0 : 2))
  })

  let result = formatter.format(amount)

  // Even when signDisplay is 'never', there are some cases where signs still appear (for example negative number on Android)
  // So we have to check if there's a sign and remove it then use our own sign config below
  if (isNaN(+result[0])) {
    result = result.substring(1)
  }

  if (showSign === 'always' && amount === 0 && signOnZero) {
    const sign = signOnZero === 'positive' ? '+' : '-'
    result = sign + result
  } else if (
    (showSign === 'always' || showSign === 'only-positive') &&
    amount > 0
  ) {
    result = '+' + result
  } else if (
    (showSign === 'always' || showSign === 'only-negative') &&
    amount < 0
  ) {
    result = '-' + result
  }

  if (showCurrency) {
    result += ` ${currency}`
  }

  return result
}
