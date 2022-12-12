import { fireEvent, render } from '@testing-library/react-native'
import { Keyboard } from '../Keyboard'

it('should handle key press correctly', () => {
  let string = ''
  const handleKeyPress = (key: string) => {
    string += key
  }

  const keyboard = render(<Keyboard onKeyPress={handleKeyPress} />)

  fireEvent.press(keyboard.getByText('1'))
  fireEvent.press(keyboard.getByText('2'))
  fireEvent.press(keyboard.getByText('3'))
  fireEvent.press(keyboard.getByText('4'))
  fireEvent.press(keyboard.getByText('5'))
  fireEvent.press(keyboard.getByText('6'))
  fireEvent.press(keyboard.getByText('7'))
  fireEvent.press(keyboard.getByText('8'))
  fireEvent.press(keyboard.getByText('9'))
  fireEvent.press(keyboard.getByText('.'))
  fireEvent.press(keyboard.getByText('0'))

  expect(string).toEqual('123456789.0')
})

it('should match snapshot', () => {
  const keyboard = render(<Keyboard onKeyPress={() => {}} />).toJSON()
  expect(keyboard).toMatchSnapshot()
})
