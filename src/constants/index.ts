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
    icon: '🍉',
    name: 'Groceries'
  },
  {
    icon: '🍪',
    name: 'Snacks'
  },
  {
    icon: '🍽️',
    name: 'Eating Out'
  },
  {
    icon: '☕',
    name: 'Coffee'
  },
  {
    icon: '🍹',
    name: 'Drinks'
  },
  {
    icon: '💄',
    name: 'Beauty'
  },
  {
    icon: '👕',
    name: 'Clothing'
  },
  {
    icon: '💍',
    name: 'Accessories'
  },
  {
    icon: '🎁',
    name: 'Gifts'
  },
  {
    icon: '🍿',
    name: 'Entertainment'
  },
  {
    icon: '📱',
    name: 'Tech'
  },
  {
    icon: '📅',
    name: 'Subscription'
  },
  {
    icon: '🚗',
    name: 'Car'
  },
  {
    icon: '🚕',
    name: 'Taxi'
  },
  {
    icon: '🙌',
    name: 'Charity'
  },
  {
    icon: '📚',
    name: 'Education'
  },
  {
    icon: '💊',
    name: 'Health'
  },
  {
    icon: '🌴',
    name: 'Travel'
  },
  {
    icon: '🐈',
    name: 'Pets'
  },
  {
    icon: '🤷‍♂️',
    name: 'Miscellaneous'
  }
]

export const defaultIncomesCategories: Category[] = [
  { icon: '💼', name: 'Business' },
  {
    icon: '💸',
    name: 'Salary'
  }
]
