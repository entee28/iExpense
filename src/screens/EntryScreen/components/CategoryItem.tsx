import React from 'react'
import { Pressable, Text } from 'libs/ui'
import colors from 'libs/ui/colors'

type Props = {
  icon: string
  onPress: () => void
  name: string
}

export const CategoryItem = ({ icon, onPress, name }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      flex={1}
      marginVertical={12}
      alignItems="center"
      justifyContent="center">
      <Text fontSize={32} marginBottom={8}>
        {icon}
      </Text>

      <Text textProps={{ numberOfLines: 1 }} bold color={colors.mono60}>
        {name}
      </Text>
    </Pressable>
  )
}
