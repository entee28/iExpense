import { render } from '@testing-library/react-native'
import { Modal } from '../Modal'

it('should match snapshot', () => {
  const modal = render(<Modal isVisible={true} />).toJSON()

  expect(modal).toMatchSnapshot()
})
