import dayjs from 'dayjs'
import { useAppSelector } from 'libs/redux'
import { getTotal } from 'libs/utils'
import isBetween from 'dayjs/plugin/isBetween'
import { uniq } from 'lodash'

dayjs.extend(isBetween)

export const useGetInsightData = (type: 'expense' | 'income') => {
  const { entryList } = useAppSelector(state => state.category)
  let chartData: InsightDay[] = []

  for (let i = 0; i < 7; i++) {
    chartData.push({
      day: i,
      amount: getTotal(
        entryList.filter(
          entry =>
            entry.date.slice(0, 10) ===
              dayjs().day(i).toISOString().slice(0, 10) && entry.type === type
        )
      )
    })
  }

  const weekEntry = entryList.filter(
    entry =>
      dayjs(entry.date).isBetween(
        dayjs().day(0).startOf('day'),
        dayjs().day(6).endOf('day')
      ) && entry.type === type
  )
  const weekCategory = uniq(weekEntry.map(entry => entry.toCategory))
  const categoryCount = (category: Category) => {
    let count = 0
    weekEntry.forEach(entry => {
      if (entry.toCategory.id === category.id) {
        count++
      }
    })

    return count
  }

  const categoryData = weekCategory.map(category => ({
    category,
    count: categoryCount(category),
    total: getTotal(
      weekEntry.filter(entry => entry.toCategory.id === category.id)
    )
  }))

  return { chartData, categoryData }
}
