import { render } from '@testing-library/react-native'
import colors from 'libs/ui/colors'
import { FontFamily, Text } from '../../atoms'
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

it('should have correct font', () => {
  const regularTextInput = render(<TextInput testID="regular_input" regular />)
  const boldTextInput = render(<TextInput testID="bold_input" bold />)
  const extraBoldTextInput = render(
    <TextInput testID="extra_bold_input" extraBold />
  )
  const mediumTextInput = render(<TextInput testID="medium_input" medium />)
  const semiBoldTextInput = render(
    <TextInput testID="semi_bold_input" semiBold />
  )

  expect(regularTextInput.getByTestId('regular_input')).toHaveStyle({
    fontFamily: FontFamily.regular
  })
  expect(boldTextInput.getByTestId('bold_input')).toHaveStyle({
    fontFamily: FontFamily.bold
  })
  expect(semiBoldTextInput.getByTestId('semi_bold_input')).toHaveStyle({
    fontFamily: FontFamily.semiBold
  })
  expect(mediumTextInput.getByTestId('medium_input')).toHaveStyle({
    fontFamily: FontFamily.medium
  })
  expect(extraBoldTextInput.getByTestId('extra_bold_input')).toHaveStyle({
    fontFamily: FontFamily.extraBold
  })
})

it('should have correct indicator', () => {
  const validTextInput = render(<TextInput isValid />)
  const invalidTextInput = render(<TextInput error="Error" />)

  expect(validTextInput.getByTestId('valid_indicator')).toBeTruthy()

  expect(invalidTextInput.getByTestId('invalid_indicator')).toBeTruthy()
})

it('should render left component if left prop is defined', () => {
  const textInputWithLeftComponent = render(
    <TextInput left={<Text>Hello</Text>} />
  )

  expect(textInputWithLeftComponent.getByText('Hello')).toBeTruthy()
})

it('should have correct background color based on editable prop', () => {
  const editableTextInput = render(<TextInput testID="editable_input" />)

  const uneditableTextInput = render(
    <TextInput editable={false} testID="uneditable_input" />
  )

  expect(editableTextInput.getByTestId('text_input.container')).toHaveStyle({
    backgroundColor: colors.white
  })
  expect(uneditableTextInput.getByTestId('text_input.container')).toHaveStyle({
    backgroundColor: colors.mono5
  })
})

it('renders correctly', () => {
  const snapshot = render(<TextInput value="test" label="hello" />).toJSON()

  expect(snapshot).toMatchSnapshot()
})
