import React from 'react'
import { Box, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { formatNumber } from 'libs/utils'

type Props = {
  title: string
  total: number
  currency: string
}

export const SectionHeader = ({ title, total, currency }: Props) => {
  return (
    <Box
      borderBottomColor={colors.mono10}
      borderBottomWidth={1}
      marginLeft={62}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginTop={12}>
      <Text color={colors.mono40} lineHeight={32}>
        {title}
      </Text>
      <Text color={colors.mono40} lineHeight={32}>
        {formatNumber(total, {
          currency,
          showCurrency: true,
          decimalCount: 1
        })}
      </Text>
    </Box>
  )
}
