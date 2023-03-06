import dayjs from 'dayjs'
import { useAppSelector } from 'libs/redux'
import { getTotal } from 'libs/utils'
import isBetween from 'dayjs/plugin/isBetween'
import { uniq } from 'lodash'

dayjs.extend(isBetween)

export const useGetWeekInsightData = (type: InsightType) => {
  const { entryList } = useAppSelector(state => state.category)
  const chartData = getWeekChartData(entryList, type)

  const weekEntry = filterCurrentWeekEntryByType(entryList, type)
  const weekCategory = uniq(weekEntry.map(entry => entry.toCategory))
  const weekData = getCategorySummaryFromList(weekCategory, weekEntry)

  return { chartData, weekData }
}

export const useGetMonthInsightData = (type: InsightType) => {
  const { entryList } = useAppSelector(state => state.category)
  const chartData = getMonthChartData(entryList, type)

  const monthEntry = filterCurrentMonthEntryByType(entryList, type)
  const monthCategory = uniq(monthEntry.map(entry => entry.toCategory))
  const monthData = getCategorySummaryFromList(monthCategory, monthEntry)

  return { chartData, monthData }
}

export const useGetYearInsightData = (type: InsightType) => {
  const { entryList } = useAppSelector(state => state.category)
  const chartData = getYearChartData(entryList, type)

  const yearEntry = filterCurrentYearEntryByType(entryList, type)
  const yearCategory = uniq(yearEntry.map(entry => entry.toCategory))
  const yearData = getCategorySummaryFromList(yearCategory, yearEntry)

  return { chartData, yearData }
}

const getWeekChartData = (entryList: Entry[], type: InsightType) => {
  let chartData: InsightBar[] = []

  for (let i = 0; i < 7; i++) {
    chartData.push({
      barIndex: i,
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
  let chartData: InsightBar[] = []

  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    chartData.push({
      barIndex: i,
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

const getYearChartData = (entryList: Entry[], type: InsightType) => {
  let chartData: InsightBar[] = []

  for (let i = 0; i < 12; i++) {
    chartData.push({
      barIndex: i,
      amount: getTotal(
        entryList.filter(
          entry => dayjs(entry.date).get('month') === i && entry.type === type
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

const filterCurrentYearEntryByType = (
  entryList: Entry[],
  type: InsightType
) => {
  return entryList.filter(
    entry =>
      dayjs(entry.date).get('year') === dayjs().year() && entry.type === type
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

const getCategorySummaryFromList = (
  categoryList: Category[],
  entryList: Entry[]
) => {
  return categoryList.map(category => ({
    category,
    count: countCategoryFromEntryList(category, entryList),
    total: getCategoryTotalAmountByList(category, entryList)
  }))
}
