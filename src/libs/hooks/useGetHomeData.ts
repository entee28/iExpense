import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import isToday from 'dayjs/plugin/isToday'
import i18n from 'libs/i18n'
import { useAppSelector } from 'libs/redux'
import { uniq } from 'lodash'
import { useTranslation } from 'react-i18next'
import { getTotal } from 'libs/utils'

dayjs.extend(isToday)

const formatDate = (date: string) => {
  if (dayjs().isSame(date, 'year')) {
    return dayjs(date)
      .locale(i18n.language)
      .format(i18n.language === 'vi' ? 'D MMMM' : 'MMMM D')
  }

  return dayjs(date)
    .locale(i18n.language)
    .format(i18n.language === 'vi' ? 'D MMM, YYYY' : 'MMM D, YYYY')
}

export const useGetHomeData = () => {
  const { t } = useTranslation()
  const { entryList } = useAppSelector(state => state.category)

  const dateList = uniq(
    entryList.map(entry => dayjs(entry.date).endOf('day').toISOString())
  )

  const data = dateList.map(date => ({
    title: dayjs(date).isToday() ? t('home_screen.today') : formatDate(date),
    data: entryList.filter(entry =>
      dayjs(entry.date).isSame(dayjs(date), 'day')
    ),
    total: getTotal(
      entryList.filter(
        entry =>
          dayjs(entry.date).isSame(dayjs(date), 'day') &&
          entry.type === 'expense'
      )
    )
  }))

  return data
}
