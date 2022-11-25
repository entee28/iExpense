import { render } from '@testing-library/react-native'
import colors from 'libs/ui/colors'
import { TextInput } from '../TextInput'

it('correctly renders label', () => {
  const textInput = render(
    <TextInput labelTestID="input_label" label="Hello" />
  )

  expect(textInput.getByTestId('input_label').children[0]).toEqual('Hello')
})

it('correctly handles error message', () => {
  const textInput = render(
    <TextInput msgTestID="error_msg" error="Hello Error" />
  )

  expect(textInput.getByTestId('error_msg').children[0]).toEqual('Hello Error')
  expect(textInput.getByTestId('error_msg')).toHaveStyle({
    color: colors.destructive
  })
})

it('renders correctly', () => {
  const snapshot = render(<TextInput value="test" label="hello" />).toJSON()

  expect(snapshot).toMatchSnapshot()
})
