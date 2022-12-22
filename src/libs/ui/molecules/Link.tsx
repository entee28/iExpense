import React from 'react'
import { Pressable, PressableProps, Text } from '../atoms'
import colors from '../colors'

type LinkProps = {
  label: string
} & PressableProps

export const Link = (props: LinkProps) => {
  const { label, ...buttonProps } = props

  return (
    <Pressable {...buttonProps}>
      <Text
        testID="link_label"
        semiBold
        color={buttonProps.disabled ? colors.mono40 : colors.primary100}>
        {label}
      </Text>
    </Pressable>
  )
}
