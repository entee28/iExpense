import { ListEmptyIndicator } from 'assets/icons'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ViewProps, ViewStyle } from 'react-native'
import { Box, Text } from '../atoms'
import colors from '../colors'
import { SCREEN_PADDING_HORIZONTAL } from '../constants'

type WEmptyProps = {
  message?: string
  viewProps?: ViewProps
} & ViewStyle
export const Empty = memo((props: WEmptyProps) => {
  const { message, viewProps, ...style } = props
  const { t } = useTranslation()

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      paddingBottom={55}
      paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
      viewProps={viewProps}
      {...style}>
      <ListEmptyIndicator />

      <Text
        textAlign="center"
        marginTop={16}
        fontSize={16}
        lineHeight={24}
        color={colors.mono40}>
        {message ?? t('common.empty_list_message')}
      </Text>
    </Box>
  )
})
