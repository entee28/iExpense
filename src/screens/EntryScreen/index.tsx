import { faArrowRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import RNDateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import isToday from 'dayjs/plugin/isToday'
import i18n from 'libs/i18n'
import { useAppSelector } from 'libs/redux'
import {
  BottomSheetMethods,
  Box,
  Button,
  FontFamily,
  Keyboard,
  NavigationBar,
  Pressable,
  SCREEN_PADDING_HORIZONTAL,
  Text
} from 'libs/ui'
import colors from 'libs/ui/colors'
import { formatNumber } from 'libs/utils'
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput } from 'react-native'
import { CategoryPicker } from './components'

dayjs.extend(isToday)

export const EntryScreen = () => {
  const { primaryCurrency } = useAppSelector(state => state.setting)
  const { accountList, expenseCategories } = useAppSelector(
    state => state.category
  )
  const { t } = useTranslation()

  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [entryType, setEntryType] = useState<'expense' | 'income' | 'transfer'>(
    'expense'
  )
  const [selectedAccount, setSelectedAccount] = useState(accountList[0])
  const [selectedCategory, setSelectedCategory] = useState(expenseCategories[0])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  const title = useMemo(() => {
    if (entryType === 'expense') {
      return 'entry_screen.expense'
    }
    if (entryType === 'income') {
      return 'entry_screen.income'
    }

    return 'entry_screen.transfer'
  }, [entryType])

  const onDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  const handleShowDatePicker = () => {
    setShowDatePicker(true)
  }

  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      if (amount !== '') {
        const newAmount = amount.slice(0, amount.length - 1)
        setAmount(newAmount)
      }
      return
    }

    if (amount.length < 10) {
      setAmount(amount + key)
    }
  }

  const categoryPickerRef = useRef<BottomSheetMethods>(null)

  const [pickerType, setPickerType] = useState<'from' | 'to'>('from')

  const handleOpenSheet = (type: 'from' | 'to') => {
    setPickerType(type)
    categoryPickerRef.current?.present()
  }

  const handleCloseSheet = () => {
    categoryPickerRef.current?.close()
  }

  return (
    <>
      <NavigationBar title={t(title)} />
      <Box flex={1} backgroundColor={colors.white}>
        <Box alignItems="center" justifyContent="center" flex={1}>
          <Box
            flexDirection="row"
            borderBottomColor={colors.mono40}
            borderBottomWidth={4}>
            <Text fontSize={48}>
              {amount === '' ? 0 : formatNumber(parseFloat(amount))}
            </Text>
            <Text color={colors.mono70} fontSize={24}>
              {primaryCurrency.symbol}
            </Text>
          </Box>
        </Box>

        <Box
          paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
          flexDirection="row"
          alignItems="center">
          <Pressable onPress={handleShowDatePicker}>
            <Text fontSize={16} bold color={colors.mono60}>
              {dayjs(date).isToday()
                ? t('entry_screen.today')
                : dayjs(date)
                    .locale(i18n.language)
                    .format(i18n.language === 'vi' ? 'D MMMM' : 'MMMM D')}
            </Text>
          </Pressable>
          <FontAwesomeIcon
            style={styles.separator}
            icon={faCircle}
            size={4}
            color={colors.mono40}
          />
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={setNote}
            placeholder={t('entry_screen.note')}
          />
        </Box>

        <Box
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.mono40}
          flexDirection="row"
          alignItems="center"
          paddingVertical={8}
          marginVertical={16}
          paddingHorizontal={SCREEN_PADDING_HORIZONTAL}>
          <Pressable
            onPress={() => handleOpenSheet('from')}
            flex={1}
            flexDirection="row"
            alignItems="center">
            <Text fontSize={16} marginRight={4}>
              {selectedAccount.icon}
            </Text>
            <Text fontSize={16} bold>
              {selectedAccount.name}
            </Text>
          </Pressable>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={colors.mono40}
            style={styles.separator}
            size={16}
          />
          <Pressable
            onPress={() => handleOpenSheet('to')}
            flex={1}
            flexDirection="row"
            alignItems="center">
            <Text fontSize={16} marginRight={4}>
              {selectedCategory.icon}
            </Text>
            <Text fontSize={16} bold>
              {selectedCategory.name}
            </Text>
          </Pressable>
          <Button
            paddingVertical={8}
            paddingHorizontal={16}
            style={styles.saveBtn}
            label={t('entry_screen.save')}
            labelStyle={styles.saveBtnLabel}
            onPress={() => {}}
          />
        </Box>

        <Keyboard onKeyPress={handleKeyPress} />
        <CategoryPicker
          setSelectedAccount={setSelectedAccount}
          setSelectedCategory={setSelectedCategory}
          setEntryType={setEntryType}
          closeSheet={handleCloseSheet}
          type={pickerType}
          ref={categoryPickerRef}
        />
        {showDatePicker && (
          <RNDateTimePicker
            maximumDate={new Date()}
            value={date}
            mode={'date'}
            onChange={onDateChange}
          />
        )}
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: FontFamily.regular,
    flex: 1,
    fontSize: 16,
    padding: 0
  },
  separator: {
    marginHorizontal: 8
  },
  saveBtn: {
    borderRadius: 99
  },
  saveBtnLabel: {
    fontWeight: '700'
  }
})
