import React from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme
} from 'victory-native'
import colors from 'libs/ui/colors'

type Props = {
  data: InsightDay[]
  weekSpent: number
}

export const InsightChart = ({ data, weekSpent }: Props) => {
  return (
    <VictoryChart height={250} theme={VictoryTheme.material}>
      <VictoryAxis
        style={{
          axis: { stroke: colors.white },
          ticks: { stroke: colors.white }
        }}
        tickValues={[0, 1, 2, 3, 4, 5, 6]}
        tickFormat={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
      <VictoryAxis
        orientation="right"
        style={{
          axis: { stroke: colors.white },
          ticks: { stroke: colors.white }
        }}
        dependentAxis
        tickValues={[0, weekSpent / 7, weekSpent]}
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
