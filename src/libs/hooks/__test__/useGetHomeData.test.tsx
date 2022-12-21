import { cleanup, render } from '@testing-library/react-native'
import dayjs from 'dayjs'
import { useAppSelector } from 'libs/redux'
import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {
  defaultAccountList,
  defaultExpensesCategories,
  defaultIncomesCategories
} from 'src/constants'
import { useGetHomeData } from '../useGetHomeData'

describe('useGetHomeData hook', () => {
  const mockEntryList: Entry[] = [
    {
      id: '1',
      amount: 20000,
      date: dayjs().toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultExpensesCategories[0],
      note: 'Test note',
      type: 'expense'
    },
    {
      id: '2',
      amount: 30000,
      date: dayjs('2022-11-03').toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultExpensesCategories[0],
      note: 'Test note',
      type: 'expense'
    },
    {
      id: '3',
      amount: 40000,
      date: dayjs().date(1).toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultExpensesCategories[0],
      note: 'Test note',
      type: 'expense'
    },
    {
      id: '4',
      amount: 10000,
      date: dayjs().toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultIncomesCategories[0],
      note: 'Test note',
      type: 'income'
    },
    {
      id: '5',
      amount: 20000,
      date: dayjs('2022-11-03').toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultIncomesCategories[0],
      note: 'Test note',
      type: 'income'
    },
    {
      id: '6',
      amount: 70000,
      date: dayjs().date(1).toISOString(),
      fromCategory: defaultAccountList[0],
      toCategory: defaultIncomesCategories[0],
      note: 'Test note',
      type: 'income'
    }
  ]

  beforeEach(() => {
    useSelectorMock.mockClear()
  })

  afterAll(() => {
    cleanup()
  })

  const reactRedux = { useAppSelector }
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  const TestComponent = () => {
    const {
      data: DATA,
      weekSpent,
      weekDiff,
      weekIncome,
      monthDiff,
      monthIncome,
      monthSpent
    } = useGetHomeData()

    const getSectionItemIds = (sectionData: Entry[]) => {
      let idArr: string[] = []
      sectionData.forEach(entry => idArr.push(entry.id))

      return idArr.toString()
    }

    return (
      <>
        <Text testID="week_spent">{weekSpent}</Text>
        <Text testID="week_diff">{weekDiff}</Text>
        <Text testID="week_income">{weekIncome}</Text>
        <Text testID="month_diff">{monthDiff}</Text>
        <Text testID="month_income">{monthIncome}</Text>
        <Text testID="month_spent">{monthSpent}</Text>
        <Text testID="section_count">{DATA.length}</Text>
        {DATA.map((section, index) => (
          <>
            <Text testID={`section${index + 1}_item`}>
              {getSectionItemIds(section.data)}
            </Text>
            <Text testID={`section${index + 1}_total`}>{section.total}</Text>
          </>
        ))}
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

  it('should categorize sections by date correctly', () => {
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

    expect(testComponent.getByTestId('section_count').children).toContain('3')
    expect(testComponent.getByTestId('section1_item').children).toContain('1,4')
    expect(testComponent.getByTestId('section1_total').children).toContain(
      '20000'
    )
    expect(testComponent.getByTestId('section2_item').children).toContain('2,5')
    expect(testComponent.getByTestId('section2_total').children).toContain(
      '30000'
    )
    expect(testComponent.getByTestId('section3_item').children).toContain('3,6')
    expect(testComponent.getByTestId('section3_total').children).toContain(
      '40000'
    )
  })
})
