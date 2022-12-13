import React from 'react'
import { formatNumber } from 'libs/utils'
import { Box, Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  category: string
  amount: number
  icon: string
  currency: string
  onPress: (entry?: Entry) => void
  type: EntryType
}

export const ExpenseItem = ({
  category,
  amount,
  icon,
  currency,
  type,
  onPress
}: Props) => {
  return (
    <Pressable
      onPress={() => onPress()}
      flexDirection="row"
      alignItems="center"
      marginTop={4}>
      {type === 'transfer' ? (
        <Box
          width={32}
          height={32}
          alignItems="center"
          justifyContent="center"
          borderRadius={99}
          marginRight={8}
          backgroundColor={colors.primary80}>
          <FontAwesomeIcon color={colors.white} icon={faArrowRightArrowLeft} />
        </Box>
      ) : (
        <Text fontSize={32} accessibilityLabel="icon">
          {icon}
        </Text>
      )}

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
        <Text
          color={type === 'income' ? colors.positive100 : colors.mono100}
          fontSize={16}
          lineHeight={32}
          accessibilityLabel="amount"
          bold>
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
