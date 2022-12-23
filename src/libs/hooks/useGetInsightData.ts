import dayjs from 'dayjs'
import { useAppSelector } from 'libs/redux'
import { getTotal } from 'libs/utils'

export const useGetInsightData = () => {
  const { entryList } = useAppSelector(state => state.category)
  let data: InsightDay[] = []

  for (let i = 0; i < 7; i++) {
    data.push({
      day: i,
      amount: getTotal(
        entryList.filter(
          entry =>
            entry.date.slice(0, 10) ===
            dayjs().day(i).toISOString().slice(0, 10)
        )
      )
    })
  }

  return { data }
}
