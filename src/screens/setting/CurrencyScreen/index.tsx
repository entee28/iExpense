import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { updateCategories } from 'libs/redux/categorySlice'
import {
  swapCurrency,
  togglePrimarySymbol,
  toggleSecondarySymbol
} from 'libs/redux/settingSlice'
import {
  BottomSheetMethods,
  Box,
  MenuItem,
  NavigationBar,
  SCREEN_PADDING_HORIZONTAL,
  Switch,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { convertEntryAmount } from 'libs/utils'
import { CurrencyPicker } from './components'

export const CurrencyScreen = () => {
  const { primaryCurrency, secondaryCurrency, primarySymbol, secondarySymbol } =
    useAppSelector(state => state.setting)
  const { entryList } = useAppSelector(state => state.category)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const CURRENCY_MENU_ITEM = [
    {
      type: 'primary',
      label: 'currency_screen.primary',
      currency: primaryCurrency.code
    },
    {
      type: 'secondary',
      label: 'currency_screen.secondary',
      currency: secondaryCurrency ? secondaryCurrency.code : ''
    }
  ]

  const onSwitchToggle = (type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      dispatch(togglePrimarySymbol())
    } else {
      dispatch(toggleSecondarySymbol())
    }
  }

  const handleSwapCurrencies = async () => {
    if (secondaryCurrency) {
      const convertedEntryAmount = await convertEntryAmount(
        entryList.map(entry => entry.amount),
        primaryCurrency?.code,
        secondaryCurrency.code
      )

      dispatch(
        updateCategories({
          entryList: entryList.map((entry, index) => ({
            ...entry,
            amount: convertedEntryAmount[index]
          }))
        })
      )
    }

    dispatch(swapCurrency())
  }

  const currencyPickerRef = useRef<BottomSheetMethods>(null)
  const [pickerType, setPickerType] = useState<'primary' | 'secondary'>(
    'primary'
  )
  const handleOpenSheet = (type: 'primary' | 'secondary') => {
    setPickerType(type)
    currencyPickerRef.current?.present()
  }
  const handleCloseSheet = () => {
    currencyPickerRef.current?.close()
  }

  return (
    <>
      <NavigationBar title={t('setting_screen.currencies')} />
      <Box
        backgroundColor={colors.white}
        flex={1}
        paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
        paddingTop={12}>
        {CURRENCY_MENU_ITEM.map(item => (
          <MenuItem
            key={item.label}
            label={
              <Box
                flex={1}
                flexDirection="row"
                paddingRight={4}
                justifyContent="space-between"
                alignItems="center"
                marginLeft={-28}>
                <Text>{t(item.label)}</Text>
                <Text color={colors.primary100}>{item.currency}</Text>
              </Box>
            }
            icon={null}
            onPress={() =>
              handleOpenSheet(item.type as 'primary' | 'secondary')
            }
          />
        ))}

        {secondaryCurrency && (
          <Box marginTop={24}>
            <MenuItem
              label={
                <Box
                  flex={1}
                  flexDirection="row"
                  paddingRight={4}
                  justifyContent="space-between"
                  alignItems="center"
                  marginLeft={-28}>
                  <Text lineHeight={22}>{t('currency_screen.swap')}</Text>
                </Box>
              }
              right={
                <FontAwesomeIcon
                  icon={faRetweet}
                  size={20}
                  color={colors.primary100}
                />
              }
              icon={null}
              onPress={handleSwapCurrencies}
            />
          </Box>
        )}

        <Text marginTop={24} marginBottom={4} color={colors.mono60}>
          {t('currency_screen.advanced')}
        </Text>

        <MenuItem
          label={
            <Box
              flex={1}
              flexDirection="row"
              paddingRight={4}
              justifyContent="space-between"
              alignItems="center"
              marginLeft={-28}>
              <Text lineHeight={22}>
                {t('currency_screen.symbol', {
                  currency: 'VND'
                })}
              </Text>
            </Box>
          }
          right={
            <Switch
              onChange={() => {
                onSwitchToggle('primary')
              }}
              value={primarySymbol}
            />
          }
          icon={null}
          disabled
        />
        {secondaryCurrency && (
          <MenuItem
            label={
              <Box
                flex={1}
                flexDirection="row"
                paddingRight={4}
                justifyContent="space-between"
                alignItems="center"
                marginLeft={-28}>
                <Text lineHeight={22}>
                  {t('currency_screen.symbol', {
                    currency: 'USD'
                  })}
                </Text>
              </Box>
            }
            right={
              <Switch
                onChange={() => {
                  onSwitchToggle('secondary')
                }}
                value={secondarySymbol}
              />
            }
            icon={null}
            disabled
          />
        )}

        <Text marginTop={4} color={colors.mono60}>
          {t('currency_screen.example')}
        </Text>
        <Text marginTop={8} color={colors.mono60}>
          {t('currency_screen.example_note')}
        </Text>
      </Box>

      <CurrencyPicker
        type={pickerType}
        ref={currencyPickerRef}
        closeSheet={handleCloseSheet}
      />
    </>
  )
}
