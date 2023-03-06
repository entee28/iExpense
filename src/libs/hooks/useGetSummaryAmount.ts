import { useAppSelector } from 'libs/redux'
import { getDiff, getTotal } from 'libs/utils'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const useGetSummaryAmount = () => {
  const { entryList } = useAppSelector(state => state.category)

  const weekSpent = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).isBetween(
          dayjs().day(0).startOf('day'),
          dayjs().day(6).endOf('day')
        ) && entry.type === 'expense'
    )
  )
  const weekIncome = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).isBetween(
          dayjs().day(0).startOf('day'),
          dayjs().day(6).endOf('day')
        ) && entry.type === 'income'
    )
  )
  const weekDiff = getDiff(
    entryList.filter(entry =>
      dayjs(entry.date).isBetween(
        dayjs().day(0).startOf('day'),
        dayjs().day(6).endOf('day')
      )
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
  const yearSpent = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).get('year') === dayjs().year() &&
        entry.type === 'expense'
    )
  )
  const yearIncome = getTotal(
    entryList.filter(
      entry =>
        dayjs(entry.date).get('year') === dayjs().year() &&
        entry.type === 'income'
    )
  )

  return {
    weekDiff,
    weekIncome,
    weekSpent,
    monthDiff,
    monthIncome,
    monthSpent,
    yearIncome,
    yearSpent
  }
}
