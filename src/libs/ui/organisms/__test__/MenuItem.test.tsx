import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { render } from '@testing-library/react-native'
import { Box, Text } from '../../atoms'
import { MenuItem } from '../MenuItem'

it('should match snapshot', () => {
  const menuItem = render(
    <MenuItem icon={<FontAwesomeIcon icon={faGear} />} label="Hello Test" />
  ).toJSON()

  const menuItemWithLabelComponent = render(
    <MenuItem
      icon={<FontAwesomeIcon icon={faGear} />}
      label={
        <Box>
          <Text>Hello Test</Text>
        </Box>
      }
    />
  ).toJSON()

  expect(menuItem).toMatchSnapshot()
  expect(menuItemWithLabelComponent).toMatchSnapshot()
})
