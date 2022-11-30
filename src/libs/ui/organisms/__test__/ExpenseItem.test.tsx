import { render } from '@testing-library/react-native'
import { ExpenseItem } from '../ExpenseItem'

it('Expense item should display information correctly', () => {
  const category = 'Eating out'
  const icon = '🍽️'
  const amount = 49000
  const currency = '₫'

  const item = render(
    <ExpenseItem
      category={category}
      icon={icon}
      amount={amount}
      currency={currency}
    />
  )

  expect(item.getByLabelText('category').children[0]).toEqual(category)
  expect(item.getByLabelText('icon').children[0]).toEqual(icon)
  expect(item.getByText)
})
