import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  BottomSheet,
  BottomSheetMethods,
  Box,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

type Props = {
  closeSheet: () => void
  currentMode: InsightType
  setMode: (mode: InsightType) => void
}

export const ModeSelectorSheet = forwardRef<BottomSheetMethods, Props>(
  (props, ref) => {
    const { closeSheet, currentMode, setMode } = props
    const { t } = useTranslation()

    const handleSelect = (mode: InsightType) => {
      setMode(mode)
      closeSheet()
    }

    return (
      <BottomSheet index={0} ref={ref} snapPoints={['25%']}>
        <Box
          paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
          flex={1}
          paddingVertical={SCREEN_PADDING_HORIZONTAL}>
          <Pressable
            style={styles.button}
            onPress={() => handleSelect('expense')}>
            <Text bold fontWeight="600" flex={1}>
              {t('insight_screen.expense')}
            </Text>
            {currentMode === 'expense' && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={colors.primary100}
                size={16}
              />
            )}
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => handleSelect('income')}>
            <Text bold fontWeight="600" flex={1}>
              {t('insight_screen.income')}
            </Text>
            {currentMode === 'income' && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={colors.primary100}
                size={16}
              />
            )}
          </Pressable>
        </Box>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary5,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
