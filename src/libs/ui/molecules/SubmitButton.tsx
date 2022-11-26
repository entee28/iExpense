import React from 'react'
import { Box } from '../atoms'
import colors from '../colors'
import { SCREEN_PADDING_HORIZONTAL } from '../constants'
import { Button, ButtonProps } from './Button'

export const SubmitButton = ({ ...props }: ButtonProps) => {
  return (
    <Box
      paddingVertical={16}
      paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
      backgroundColor={colors.white}
      borderTopWidth={1}
      borderTopColor={colors.mono10}>
      <Button {...props} />
    </Box>
  )
}
