import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'
import { useAppSelector } from 'libs/redux'
import { uniq } from 'lodash'
import { useTranslation } from 'react-i18next'
import i18n from 'libs/i18n'

dayjs.extend(isToday)
dayjs.extend(isBetween)

export const useGetHomeData = () => {
  const { t } = useTranslation()
  const { entryList } = useAppSelector(state => state.category)

  const dateList = uniq(entryList.map(entry => entry.date.slice(0, 10)))

  const data = dateList.map(date => ({
    title: dayjs(date).isToday()
      ? t('home_screen.today')
      : dayjs(date)
          .locale(i18n.language)
          .format(i18n.language === 'vi' ? 'D MMMM' : 'MMMM D'),
    data: entryList.filter(entry => entry.date.slice(0, 10) === date),
    total: getTotal(
      entryList.filter(
        entry => entry.date.slice(0, 10) === date && entry.type === 'expense'
      )
    )
  }))

  const weekSpent = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).isBetween(dayjs().day(0), dayjs().day(6)) &&
        entry.type === 'expense'
    )
  )
  const weekIncome = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).isBetween(dayjs().day(0), dayjs().day(6)) &&
        entry.type === 'income'
    )
  )
  const weekDiff = getDiff(
    entryList.filter(entry =>
      dayjs(entry.date).isBetween(dayjs().day(0), dayjs().day(6))
    )
  )
  const monthSpent = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).get('month') === dayjs().month() &&
        entry.type === 'expense'
    )
  )
  const monthIncome = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).get('month') === dayjs().month() &&
        entry.type === 'income'
    )
  )
  const monthDiff = getDiff(
    entryList.filter(
      entry => dayjs(entry.date).get('month') === dayjs().month()
    )
  )

  return {
    data,
    weekDiff,
    weekIncome,
    weekSpent,
    monthDiff,
    monthIncome,
    monthSpent
  }
}

const getTotal = (entryList: Entry[]) => {
  let amount = 0
  entryList.forEach(entry => (amount += entry.amount))

  return amount
}

const getDiff = (entryList: Entry[]) => {
  let amount = 0
  entryList.forEach(entry => {
    if (entry.type === 'expense') {
      amount -= entry.amount
    } else if (entry.type === 'income') {
      amount += entry.amount
    }
  })

  return amount
}
