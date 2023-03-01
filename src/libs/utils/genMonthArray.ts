import dayjs from 'dayjs'

export const genMonthTickValue = () => {
  const monthArray = []
  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    monthArray.push(i)
  }
  return monthArray
}

export const genMonthTickFormat = () => {
  const monthArray = []
  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    if (i === 1 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25) {
      monthArray.push(i)
    } else {
      monthArray.push('')
    }
  }
  return monthArray
}
