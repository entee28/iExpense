import React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'

type Props = {
  children?: React.ReactNode
  viewProps?: ViewProps
} & ViewStyle

export const Box = ({ children, viewProps, ...styles }: Props) => {
  return (
    <View {...viewProps} style={styles}>
      {children}
    </View>
  )
}
