import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NavigationBar } from '../NavigationBar'

it('should match snapshot', () => {
  const navbar = render(
    <NavigationBar
      title="Hello Test"
      right={<FontAwesomeIcon icon={faGear} />}
    />
  ).toJSON()

  expect(navbar).toMatchSnapshot()
})
