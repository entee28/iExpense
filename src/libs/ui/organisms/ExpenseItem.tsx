import React from 'react'
import { formatNumber } from 'libs/utils'
import { Box, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'

type Props = {
  category: string
  amount: number
  icon: string
  currency: string
}

export const ExpenseItem = ({ category, amount, icon, currency }: Props) => {
  return (
    <Pressable flexDirection="row" alignItems="center" marginTop={4}>
      <Text fontSize={42} accessibilityLabel="icon">
        {icon}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        marginLeft={20}
        borderBottomColor={colors.mono10}
        borderBottomWidth={1}
        paddingBottom={8}
        paddingTop={14}>
        <Text fontSize={18} accessibilityLabel="category" lineHeight={32} bold>
          {category}
        </Text>
        <Text fontSize={16} lineHeight={32} accessibilityLabel="amount" bold>
          {formatNumber(amount, {
            currency,
            showCurrency: true,
            decimalCount: 1
          })}
        </Text>
      </Box>
    </Pressable>
  )
}
