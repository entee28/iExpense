import React, { useMemo } from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme
} from 'victory-native'
import colors from 'libs/ui/colors'
import { genMonthTickFormat, genMonthTickValue } from 'libs/utils'
import dayjs from 'dayjs'

type Props = {
  data: InsightDay[]
  amount: number
  type: 'week' | 'month'
}

export const InsightChart = ({ data, amount, type }: Props) => {
  const horizontalTick = useMemo(() => {
    if (type === 'week') {
      return {
        values: [0, 1, 2, 3, 4, 5, 6],
        format: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    }

    return {
      values: genMonthTickValue(),
      format: genMonthTickFormat()
    }
  }, [type])

  const verticalAverageTick = useMemo(() => {
    if (type === 'week') {
      return amount / 7
    }

    return amount / dayjs().daysInMonth()
  }, [type])

  return (
    <VictoryChart height={250} theme={VictoryTheme.material}>
      <VictoryAxis
        style={{
          axis: { stroke: colors.white },
          ticks: { stroke: colors.white }
        }}
        tickValues={horizontalTick.values}
        tickFormat={horizontalTick.format}
      />
      <VictoryAxis
        orientation="right"
        style={{
          axis: { stroke: colors.white },
          ticks: { stroke: colors.white }
        }}
        dependentAxis
        tickValues={[0, verticalAverageTick, amount]}
        tickFormat={(x: number) =>
          x > 1000
            ? `${(x / 1000).toFixed(1)}k`
            : x === 0
            ? 0
            : `${x.toFixed(1)}`
        }
      />

      <VictoryBar
        barRatio={0.75}
        cornerRadius={{
          top: 4,
          bottom: 4
        }}
        style={{ data: { fill: colors.primary100 } }}
        data={data}
        x="day"
        y="amount"
      />
    </VictoryChart>
  )
}
