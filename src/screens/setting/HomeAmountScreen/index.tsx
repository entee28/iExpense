import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { saveSetting } from 'libs/redux/settingSlice'
import {
  Box,
  NavigationBar,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { HOME_AMOUNT_OPTIONS } from 'src/constants'

export const HomeAmountScreen = () => {
  const { t } = useTranslation()

  const homeAmountOption = useAppSelector(
    state => state.setting.homeAmountOption
  )
  const dispatch = useAppDispatch()

  const handleChangeHomeAmount = (option: HOME_AMOUNT_OPTIONS) => {
    dispatch(
      saveSetting({
        homeAmountOption: option
      })
    )
  }

  return (
    <>
      <NavigationBar title={t('setting_screen.home_amount')} />
      <Box
        flex={1}
        paddingTop={12}
        backgroundColor={colors.white}
        paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
        {(
          Object.keys(HOME_AMOUNT_OPTIONS) as Array<
            keyof typeof HOME_AMOUNT_OPTIONS
          >
        ).map(key => (
          <Pressable
            key={key}
            style={styles.button}
            onPress={() => handleChangeHomeAmount(HOME_AMOUNT_OPTIONS[key])}>
            <Text bold fontWeight="600" flex={1}>
              {t(`home_amount_screen.${key}`)}
            </Text>
            {key === homeAmountOption && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={colors.primary100}
                size={16}
              />
            )}
          </Pressable>
        ))}
      </Box>
    </>
  )
}

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
