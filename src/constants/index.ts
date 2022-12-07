import { v4 as uuidv4 } from 'uuid'

export enum HOME_AMOUNT_OPTIONS {
  SPENT_THIS_WEEK = 'SPENT_THIS_WEEK',
  SPENT_THIS_MONTH = 'SPENT_THIS_MONTH',
  REVENUE_THIS_WEEK = 'REVENUE_THIS_WEEK',
  REVENUE_THIS_MONTH = 'REVENUE_THIS_MONTH',
  PROFIT_LOSS_THIS_WEEK = 'PROFIT_LOSS_THIS_WEEK',
  PROFIT_LOSS_THIS_MONTH = 'PROFIT_LOSS_THIS_MONTH'
}

export const defaultExpensesCategories: Category[] = [
  {
    id: uuidv4(),
    icon: '🍉',
    name: 'Groceries'
  },
  {
    id: uuidv4(),
    icon: '🍪',
    name: 'Snacks'
  },
  {
    id: uuidv4(),
    icon: '🍽️',
    name: 'Eating Out'
  },
  {
    id: uuidv4(),
    icon: '☕',
    name: 'Coffee'
  },
  {
    id: uuidv4(),
    icon: '🍹',
    name: 'Drinks'
  },
  {
    id: uuidv4(),
    icon: '💄',
    name: 'Beauty'
  },
  {
    id: uuidv4(),
    icon: '👕',
    name: 'Clothing'
  },
  {
    id: uuidv4(),
    icon: '💍',
    name: 'Accessories'
  },
  {
    id: uuidv4(),
    icon: '🎁',
    name: 'Gifts'
  },
  {
    id: uuidv4(),
    icon: '🍿',
    name: 'Entertainment'
  },
  {
    id: uuidv4(),
    icon: '📱',
    name: 'Tech'
  },
  {
    id: uuidv4(),
    icon: '📅',
    name: 'Subscription'
  },
  {
    id: uuidv4(),
    icon: '🚗',
    name: 'Car'
  },
  {
    id: uuidv4(),
    icon: '🚕',
    name: 'Taxi'
  },
  {
    id: uuidv4(),
    icon: '🙌',
    name: 'Charity'
  },
  {
    id: uuidv4(),
    icon: '📚',
    name: 'Education'
  },
  {
    id: uuidv4(),
    icon: '💊',
    name: 'Health'
  },
  {
    id: uuidv4(),
    icon: '🌴',
    name: 'Travel'
  },
  {
    id: uuidv4(),
    icon: '🐈',
    name: 'Pets'
  },
  {
    id: uuidv4(),
    icon: '🤷‍♂️',
    name: 'Miscellaneous'
  }
]

export const defaultIncomesCategories: Category[] = [
  { id: uuidv4(), icon: '💼', name: 'Business' },
  {
    id: uuidv4(),
    icon: '💸',
    name: 'Salary'
  }
]
