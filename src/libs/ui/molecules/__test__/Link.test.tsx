import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Link } from '../Link'

describe('Link', () => {
  it('correctly handles press event', () => {
    const handlePress = jest.fn()

    const link = render(
      <Link testID="link" label="Hello" onPress={handlePress} />
    )

    fireEvent.press(link.getByTestId('link'))
    expect(handlePress).toHaveBeenCalled()
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
