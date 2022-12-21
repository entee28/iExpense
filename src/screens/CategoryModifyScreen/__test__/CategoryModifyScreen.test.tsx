import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CategoryModifyScreen } from '..'
import i18n from 'libs/i18n'
import React from 'react'

describe('Category Modify Screen', () => {
  const mockStore = configureStore()()

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={mockStore}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    )
  }

  it('should enable/disable done button properly', () => {
    const screen1 = render(
      <Wrapper>
        <CategoryModifyScreen
          navigation={{} as any}
          route={{
            key: 'CategoryModifyScreen',
            name: 'CategoryModifyScreen',
            params: {
              option: 'new_expense_category'
            }
          }}
        />
      </Wrapper>
    )

    const screen2 = render(
      <Wrapper>
        <CategoryModifyScreen
          navigation={{} as any}
          route={{
            key: 'CategoryModifyScreen',
            name: 'CategoryModifyScreen',
            params: {
              option: 'new_expense_category',
              category: 'Test'
            }
          }}
        />
      </Wrapper>
    )

    expect(screen1.getByTestId('category_modify.done_btn')).toBeDisabled()
    expect(screen2.getByTestId('category_modify.done_btn')).not.toBeDisabled()
  })

  it('should display correct navbar title based on option param', () => {
    const mockStore = configureStore()()

    const renderScreenByOption = (
      option:
        | 'edit_expense_category'
        | 'edit_income_category'
        | 'edit_account'
        | 'new_account'
        | 'new_expense_category'
        | 'new_income_category'
    ) => {
      return render(
        <Wrapper>
          <CategoryModifyScreen
            navigation={{} as any}
            route={{
              key: 'CategoryModifyScreen',
              name: 'CategoryModifyScreen',
              params: {
                option
              }
            }}
          />
        </Wrapper>
      )
    }

    expect(
      renderScreenByOption('new_expense_category').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('New Expense Category')
    expect(
      renderScreenByOption('edit_expense_category').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('Edit Category')
    expect(
      renderScreenByOption('new_income_category').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('New Income Category')
    expect(
      renderScreenByOption('edit_income_category').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('Edit Category')
    expect(
      renderScreenByOption('new_account').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('New Account')
    expect(
      renderScreenByOption('edit_account').getByTestId(
        'navigation_bar.category_modify_screen_title'
      ).children
    ).toContain('Edit Account')
  })
})
