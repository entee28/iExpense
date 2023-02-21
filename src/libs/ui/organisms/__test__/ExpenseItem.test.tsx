import { fireEvent, render } from '@testing-library/react-native'
import { ExpenseItem } from '../ExpenseItem'

const category = 'Eating out'
const icon = '🍽️'
const amount = 49000
const currency = '₫'

it('should display information correctly', () => {
  const item = render(
    <ExpenseItem
      type="expense"
      onPress={() => {}}
      category={category}
      icon={icon}
      amount={amount}
      currency={currency}
    />
  )

  expect(item.getByLabelText('category').children[0]).toEqual(category)
  expect(item.getByLabelText('icon').children[0]).toEqual(icon)
  expect(item.getByLabelText('amount').children[0]).toEqual('49,000.0 ₫')
})

it('should be able to handle press', () => {
  const handlePress = jest.fn()

  const item = render(
    <ExpenseItem
      type="expense"
      onPress={handlePress}
      category={category}
      icon={icon}
      amount={amount}
      currency={currency}
      testID="expense_item"
    />
  )

  fireEvent.press(item.getByTestId('expense_item'))
  expect(handlePress).toHaveBeenCalled()
})

it('should match snapshot', () => {
  const snapshot1 = render(
    <ExpenseItem
      type="expense"
      onPress={() => {}}
      category={category}
      icon={icon}
      amount={amount}
      currency={currency}
    />
  ).toJSON()
  const snapshot2 = render(
    <ExpenseItem
      type="expense"
      onPress={() => {}}
      category={category}
      icon={icon}
      amount={amount}
      currency={currency}
      count={12}
    />
  ).toJSON()

  expect(snapshot1).toMatchSnapshot()
  expect(snapshot2).toMatchSnapshot()
})
