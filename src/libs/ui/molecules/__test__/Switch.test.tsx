import { fireEvent, render } from '@testing-library/react-native'
import colors from '../../colors'
import { Switch } from '../Switch'

it('should toggle value on press', () => {
  let value = false
  const setValue = (newValue: boolean) => {
    value = newValue
  }

  const testSwitch = render(
    <Switch value={value} onChange={setValue} accessibilityLabel="switch" />
  )

  fireEvent.press(testSwitch.getByTestId('switch'))
  expect(value).toEqual(true)
})

it('should renders state correctly', () => {
  const offSwitch = render(<Switch value={false} trackTestID="track" />)
  const offDisabledSwitch = render(
    <Switch value={false} disabled trackTestID="track" />
  )
  const onSwitch = render(<Switch value={true} trackTestID="track" />)
  const onDisabledSwitch = render(
    <Switch value={true} disabled trackTestID="track" />
  )

  expect(offSwitch.getByTestId('track')).toHaveStyle({
    backgroundColor: colors.mono40
  })

  expect(offDisabledSwitch.getByTestId('track')).toHaveStyle({
    backgroundColor: colors.mono5
  })

  expect(onSwitch.getByTestId('track')).toHaveStyle({
    backgroundColor: colors.primary100
  })

  expect(onDisabledSwitch.getByTestId('track')).toHaveStyle({
    backgroundColor: colors.primary30
  })
})

it('should match snapshot', () => {
  let value = false
  const setValue = (newValue: boolean) => {
    value = newValue
  }
  const snapshot = render(
    <Switch
      value={value}
      onChange={setValue}
      accessibilityLabel="switch"
      disabled={false}
    />
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
