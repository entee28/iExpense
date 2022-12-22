import { render } from '@testing-library/react-native'
import { Empty } from '../Empty'

it('should match snapshot', () => {
  const snapshot = render(<Empty />).toJSON()
  expect(snapshot).toMatchSnapshot()
})
