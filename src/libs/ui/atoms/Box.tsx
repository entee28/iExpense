import React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'

type Props = {
  children?: React.ReactNode
  viewProps?: ViewProps
  testID?: string
} & ViewStyle

export const Box = ({ children, viewProps, testID, ...styles }: Props) => {
  return (
    <View testID={testID} {...viewProps} style={styles}>
      {children}
    </View>
  )
}
