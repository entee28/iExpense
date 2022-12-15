import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from 'libs/ui/colors'
import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Box, Pressable, Text } from '../atoms'

type Props = {
  icon: React.ReactNode
  label: string | React.ReactNode
  onPress?: () => void
  right?: React.ReactNode
  accessibilityLabel?: string
  disabled?: boolean
  testID?: string
} & Omit<ViewStyle, 'right'>

export const MenuItem = ({
  icon,
  label,
  onPress,
  right,
  accessibilityLabel,
  disabled = false,
  testID,
  ...props
}: Props) => {
  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      style={[styles.item, { ...props }]}
      onPress={onPress}>
      <Box
        width={16}
        height={16}
        marginRight={12}
        alignItems="center"
        justifyContent="center">
        {icon}
      </Box>
      {typeof label === 'string' ? <Text flex={1}>{label}</Text> : label}

      {right ? (
        right
      ) : (
        <FontAwesomeIcon
          icon={faChevronRight}
          size={16}
          color={colors.mono40}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center'
  }
})
