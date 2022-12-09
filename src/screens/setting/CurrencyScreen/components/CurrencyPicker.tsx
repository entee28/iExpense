import {
  faCircleXmark,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAppDispatch } from 'libs/redux'
import {
  BottomSheet,
  BottomSheetMethods,
  Box,
  Empty,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text,
  TextInput
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { forwardRef, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import currencies from 'src/constants/currencies.json'
import { saveSetting } from 'libs/redux/settingSlice'

type Props = {
  closeSheet: () => void
  type: 'primary' | 'secondary'
}

const CurrencyData: Currency[] = Object.values(currencies)

export const CurrencyPicker = forwardRef<BottomSheetMethods, Props>(
  (props, ref) => {
    const { type, closeSheet } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [input, setInput] = useState('')

    const searchData = useMemo(() => {
      if (input) {
        return CurrencyData.filter(
          item =>
            item.name.toLowerCase().includes(input.toLowerCase()) ||
            item.code.toLowerCase().includes(input.toLocaleLowerCase())
        )
      }
      return CurrencyData as any[]
    }, [input])

    const emptyInput = () => {
      setInput('')
    }

    const right = useMemo(() => {
      if (input === '') {
        return undefined
      }

      return (
        <Pressable onPress={emptyInput}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size={16}
            color={colors.mono40}
          />
        </Pressable>
      )
    }, [input])

    const handleSelect = (item: Currency) => {
      if (type === 'primary') {
        dispatch(
          saveSetting({
            primaryCurrency: item
          })
        )
      } else {
        dispatch(
          saveSetting({
            secondaryCurrency: item
          })
        )
      }

      closeSheet()
    }

    const handleSelectNone = () => {
      dispatch(
        saveSetting({
          secondaryCurrency: null
        })
      )

      closeSheet()
    }

    const renderItem = ({ item }: { item: Currency }) => {
      return (
        <Pressable style={styles.item} onPress={() => handleSelect(item)}>
          <Box width={64}>
            <Text fontSize={16} bold color={colors.mono60}>
              {item.code}
            </Text>
          </Box>

          <Text fontSize={16}>{item.name}</Text>
        </Pressable>
      )
    }

    return (
      <BottomSheet index={0} ref={ref} snapPoints={['95%']}>
        <Box
          paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
          flex={1}
          paddingBottom={SCREEN_PADDING_HORIZONTAL}>
          <Text
            fontSize={16}
            marginBottom={18}
            lineHeight={24}
            bold
            marginTop={8}
            textAlign={'center'}>
            {t(
              type === 'primary'
                ? 'currency_screen.primary'
                : 'currency_screen.secondary'
            )}
          </Text>

          <TextInput
            left={
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color={colors.mono40}
                size={16}
              />
            }
            placeholder={t('currency_screen.search')}
            value={input}
            onChangeText={setInput}
            right={right}
            accessibilityLabel="bank_search_input"
          />

          {searchData.length > 0 ? (
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={item => item.code}
              style={styles.margin}
              ListHeaderComponent={
                type === 'secondary'
                  ? () => (
                      <Pressable style={styles.item} onPress={handleSelectNone}>
                        <Text fontSize={16}>{t('currency_screen.none')}</Text>
                      </Pressable>
                    )
                  : null
              }
            />
          ) : (
            <Empty message={t('currency_screen.empty')} />
          )}
        </Box>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.mono80
  },
  margin: {
    marginTop: 16
  }
})
