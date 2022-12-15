import Decimal from 'decimal.js'
import { Convert } from 'easy-currencies'

/** Return code and rate of currency that have higher value */
const getConvertRate = async (currencyCode1: string, currencyCode2: string) => {
  const currency1Rate = (await Convert().from(currencyCode1).fetch()).rates[
    currencyCode2
  ]
  const currency2Rate = (await Convert().from(currencyCode2).fetch()).rates[
    currencyCode1
  ]

  if (currency2Rate < currency1Rate) {
    return {
      code: currencyCode2,
      rate: currency2Rate
    }
  } else {
    return {
      code: currencyCode1,
      rate: currency1Rate
    }
  }
}

export const convertEntryAmount = async (
  amountList: number[],
  fromCurrencyCode: string,
  toCurrencyCode: string
) => {
  const { code, rate } = await getConvertRate(fromCurrencyCode, toCurrencyCode)

  let convertRate = rate
  if (toCurrencyCode === code) {
    convertRate = 1 / rate
  }

  for (let i = 0; i < amountList.length; i++) {
    amountList[i] = new Decimal(amountList[i]).mul(convertRate).toNumber()
  }

  return amountList
}
