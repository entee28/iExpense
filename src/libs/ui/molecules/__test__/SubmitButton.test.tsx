import { render } from '@testing-library/react-native'
import colors from '../../colors'
import { SubmitButton } from '../SubmitButton'

it('Button should render variation styles correctly', () => {
  const primaryBtn = render(
    <SubmitButton
      label="Primary Button"
      variation="primary"
      onPress={() => {}}
      testID="primary_btn"
    />
  )
  const secondaryBtn = render(
    <SubmitButton
      label="Secondary Button"
      variation="secondary"
      onPress={() => {}}
      testID="secondary_btn"
    />
  )
  const tertiaryBtn = render(
    <SubmitButton
      label="Tertiary Button"
      variation="tertiary"
      onPress={() => {}}
      testID="tertiary_btn"
    />
  )
  const disbledBtn = render(
    <SubmitButton
      label="Disabled Button"
      disabled
      onPress={() => {}}
      testID="disabled_btn"
    />
  )

  expect(primaryBtn.getByTestId('primary_btn')).toHaveStyle({
    backgroundColor: colors.primary100
  })
  expect(primaryBtn.getByText('Primary Button')).toHaveStyle({
    color: colors.white
  })

  expect(secondaryBtn.getByTestId('secondary_btn')).toHaveStyle({
    backgroundColor: colors.primary10
  })
  expect(secondaryBtn.getByText('Secondary Button')).toHaveStyle({
    color: colors.primary100
  })

  expect(tertiaryBtn.getByTestId('tertiary_btn')).toHaveStyle({
    backgroundColor: colors.transparent
  })
  expect(tertiaryBtn.getByText('Tertiary Button')).toHaveStyle({
    color: colors.primary100
  })

  expect(disbledBtn.getByTestId('disabled_btn')).toHaveStyle({
    backgroundColor: colors.mono5
  })
  expect(disbledBtn.getByText('Disabled Button')).toHaveStyle({
    color: colors.mono40
  })
})

it('Button should render styles correctly', () => {
  const btn1 = render(
    <SubmitButton
      label="Button 1"
      onPress={() => {}}
      testID="btn1"
      style={{ backgroundColor: 'red' }}
      labelStyle={{ color: 'blue' }}
    />
  )
  const btn2 = render(
    <SubmitButton
      label="Button 2"
      onPress={() => {}}
      testID="btn2"
      variation="primary"
      style={{ backgroundColor: 'red' }}
      labelStyle={{ color: 'blue' }}
    />
  )

  expect(btn1.getByTestId('btn1')).toHaveStyle({
    backgroundColor: 'red'
  })
  expect(btn1.getByText('Button 1')).toHaveStyle({
    color: 'blue'
  })

  expect(btn2.getByTestId('btn2')).toHaveStyle({
    backgroundColor: 'red'
  })
  expect(btn2.getByText('Button 2')).toHaveStyle({
    color: 'blue'
  })
})

it('Button should match snapshot', () => {
  const snapshot = render(
    <SubmitButton
      label="Submit Button"
      onPress={() => {}}
      testID="submit_btn"
      variation="primary"
      style={{ backgroundColor: 'red' }}
      labelStyle={{ color: 'blue' }}
    />
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
