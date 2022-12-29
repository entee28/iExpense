import dayjs from 'dayjs'
import { useAppSelector } from 'libs/redux'
import { getTotal } from 'libs/utils'
import isBetween from 'dayjs/plugin/isBetween'
import { uniq } from 'lodash'

dayjs.extend(isBetween)

const getWeekChartData = (entryList: Entry[], type: InsightType) => {
  let chartData: InsightDay[] = []

  for (let i = 0; i < 7; i++) {
    chartData.push({
      day: i,
      amount: getTotal(
        entryList.filter(
          entry =>
            dayjs(entry.date).isSame(dayjs().day(i), 'day') &&
            entry.type === type
        )
      )
    })
  }

  return chartData
}

const getMonthChartData = (entryList: Entry[], type: InsightType) => {
  let chartData: InsightDay[] = []

  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    chartData.push({
      day: i,
      amount: getTotal(
        entryList.filter(
          entry =>
            dayjs(entry.date).isSame(dayjs().date(i), 'day') &&
            entry.type === type
        )
      )
    })
  }

  return chartData
}

const filterCurrentWeekEntryByType = (
  entryList: Entry[],
  type: InsightType
) => {
  return entryList.filter(
    entry =>
      dayjs(entry.date).isBetween(
        dayjs().day(0).startOf('day'),
        dayjs().day(6).endOf('day')
      ) && entry.type === type
  )
}

const filterCurrentMonthEntryByType = (
  entryList: Entry[],
  type: InsightType
) => {
  return entryList.filter(
    entry =>
      dayjs(entry.date).get('month') === dayjs().month() && entry.type === type
  )
}

const countCategoryFromEntryList = (category: Category, entryList: Entry[]) => {
  let count = 0
  entryList.forEach(entry => {
    if (entry.toCategory.id === category.id) {
      count++
    }
  })

  return count
}

const getCategoryTotalAmountByList = (
  category: Category,
  entryList: Entry[]
) => {
  return getTotal(
    entryList.filter(entry => entry.toCategory.id === category.id)
  )
}

export const useGetWeekInsightData = (type: InsightType) => {
  const { entryList } = useAppSelector(state => state.category)
  const chartData = getWeekChartData(entryList, type)

  const weekEntry = filterCurrentWeekEntryByType(entryList, type)
  const weekCategory = uniq(weekEntry.map(entry => entry.toCategory))
  const weekData = weekCategory.map(category => ({
    category,
    count: countCategoryFromEntryList(category, weekEntry),
    total: getCategoryTotalAmountByList(category, entryList)
  }))

  return { chartData, weekData }
}

export const useGetMonthInsightData = (type: InsightType) => {
  const { entryList } = useAppSelector(state => state.category)
  const chartData = getMonthChartData(entryList, type)

  const monthEntry = filterCurrentMonthEntryByType(entryList, type)
  const monthCategory = uniq(monthEntry.map(entry => entry.toCategory))
  const monthData = monthCategory.map(category => ({
    category,
    count: countCategoryFromEntryList(category, monthEntry),
    total: getCategoryTotalAmountByList(category, entryList)
  }))

  return { chartData, monthData }
}
