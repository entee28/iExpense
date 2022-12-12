import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Insets, StyleSheet, ViewStyle } from 'react-native'
import { Box, Pressable, Text } from '../atoms'
import colors from '../colors'

type Props = ViewStyle & {
  onKeyPress: (key: string) => void
  integerOnly?: boolean
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del']
]

export const Keyboard = (props: Props) => {
  const { onKeyPress, integerOnly, ...viewStyle } = props

  return (
    <Box {...viewStyle}>
      {KEYS.map((row, index) => (
        <Box
          flexDirection="row"
          justifyContent="space-around"
          key={`key-row-${index}`}
          marginTop={index > 0 ? 12 : 0}>
          {row.map(key => (
            <Pressable
              key={`key-${key}`}
              hitSlop={HIT_SLOP}
              onPress={
                key === '.' && integerOnly ? undefined : () => onKeyPress(key)
              }
              style={styles.key}>
              {key !== 'del' ? (
                <Text fontSize={32} lineHeight={38} bold textAlign="center">
                  {key === '.' && integerOnly ? '' : key}
                </Text>
              ) : (
                <FontAwesomeIcon
                  icon={faDeleteLeft}
                  size={24}
                  color={colors.mono100}
                />
              )}
            </Pressable>
          ))}
        </Box>
      ))}
    </Box>
  )
}

const HIT_SLOP: Insets = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
}

const styles = StyleSheet.create({
  key: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
