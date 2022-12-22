import { formatNumber } from '../formatNumber'

it('should return the formatted string correctly', () => {
  const num1 = 200000000000
  expect(formatNumber(num1)).toEqual('200,000,000,000')
  expect(
    formatNumber(num1, {
      currency: 'VND',
      showSign: 'always',
      decimalCount: 2,
      showCurrency: true
    })
  ).toEqual('+200,000,000,000.00 VND')

  const num2 = 29.123456
  const num3 = -29.1
  expect(
    formatNumber(num2, {
      currency: 'USD',
      showSign: 'only-negative',
      minDecimalCount: 2,
      maxDecimalCount: 5,
      showCurrency: true
    })
  ).toEqual('29.12346 USD')
  expect(
    formatNumber(num3, {
      currency: 'USD',
      showSign: 'only-negative',
      minDecimalCount: 2,
      maxDecimalCount: 5,
      showCurrency: true
    })
  ).toEqual('-29.10 USD')
})
