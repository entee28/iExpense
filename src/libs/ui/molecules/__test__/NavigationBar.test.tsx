import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { fireEvent, render } from '@testing-library/react-native'
import { NavigationBar } from '../NavigationBar'

it('should run passed onBack prop function', () => {
  const onBack = jest.fn()

  const navbar = render(
    <NavigationBar
      title="Hello Test"
      right={<FontAwesomeIcon icon={faGear} />}
      onBack={onBack}
    />
  )

  fireEvent.press(navbar.getByTestId('navigation_bar.left'))
  expect(onBack).toHaveBeenCalled()
})

it('should match snapshot', () => {
  const navbar = render(
    <NavigationBar
      title="Hello Test"
      right={<FontAwesomeIcon icon={faGear} />}
    />
  ).toJSON()

  expect(navbar).toMatchSnapshot()
})
