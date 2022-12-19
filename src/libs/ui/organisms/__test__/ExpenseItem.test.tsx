import { render } from '@testing-library/react-native'
import { ExpenseItem } from '../ExpenseItem'

const category = 'Eating out'
const icon = '🍽️'
const amount = 49000
const currency = '₫'

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

it('should display information correctly', () => {
  expect(item.getByLabelText('category').children[0]).toEqual(category)
  expect(item.getByLabelText('icon').children[0]).toEqual(icon)
  expect(item.getByLabelText('amount').children[0]).toEqual('49,000.0 ₫')
})

it('should match snapshot', () => {
  expect(item.toJSON()).toMatchSnapshot()
})
