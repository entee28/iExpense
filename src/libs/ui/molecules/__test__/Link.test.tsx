import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Link } from '../Link'

describe('Link', () => {
  it('correctly handles press event', () => {
    let pressed = false

    const press = () => {
      pressed = true
    }

    const link = render(<Link testID="link" label="Hello" onPress={press} />)

    fireEvent.press(link.getByTestId('link'))
    expect(pressed).toEqual(true)
  })

  it('should render label correctly', () => {
    const link = render(<Link label="Hello Test" testID="link" />)

    expect(link.getByTestId('link_label').children).toContain('Hello Test')
  })

  it('should match snapshot', () => {
    const snapshot = render(<Link label="Hello Test" testID="link" />).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})
