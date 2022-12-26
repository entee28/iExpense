import { cleanup, render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useGetSummaryAmount } from '../useGetSummaryAmount'
import { mockEntryList } from './useGetHomeData.test'

describe('useGetSummaryAmount hook', () => {
  afterAll(() => {
    cleanup()
  })

  const TestComponent = () => {
    const {
      weekSpent,
      weekDiff,
      weekIncome,
      monthDiff,
      monthIncome,
      monthSpent
    } = useGetSummaryAmount()

    return (
      <>
        <Text testID="week_spent">{weekSpent}</Text>
        <Text testID="week_diff">{weekDiff}</Text>
        <Text testID="week_income">{weekIncome}</Text>
        <Text testID="month_diff">{monthDiff}</Text>
        <Text testID="month_income">{monthIncome}</Text>
        <Text testID="month_spent">{monthSpent}</Text>
      </>
    )
  }

  it('should return the correct summary amount', () => {
    const mockStore = configureStore()
    const initialState = {
      category: {
        entryList: mockEntryList
      }
    }
    let updatedStore = mockStore(initialState)

    const testComponent = render(
      <Provider store={updatedStore}>
        <TestComponent />
      </Provider>
    )

    expect(testComponent.getByTestId('week_spent').children).toContain('20000')
    expect(testComponent.getByTestId('week_income').children).toContain('10000')
    expect(testComponent.getByTestId('week_diff').children).toContain('-10000')
    expect(testComponent.getByTestId('month_spent').children).toContain('60000')
    expect(testComponent.getByTestId('month_income').children).toContain(
      '80000'
    )
    expect(testComponent.getByTestId('month_diff').children).toContain('20000')
  })
})
