import { render } from '@testing-library/react-native'
import colors from 'libs/ui/colors'
import { Text } from '../Text'

it('renders text correctly', () => {
  const text = render(<Text>Hello World</Text>)

  expect(text.container.props.children).toEqual('Hello World')
})

it('renders the correct styles', () => {
  const text1 = render(<Text>Hello World</Text>)
  const text2 = render(
    <Text
      color={colors.mono40}
      fontSize={16}
      lineHeight={24}
      textAlign="center"
      bold>
      Hello World
    </Text>
  )

  const text3 = render(<Text semiBold>Hello World</Text>)

  expect(text1.getByText('Hello World')).toHaveStyle({
    color: colors.mono100,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'auto',
    fontFamily: 'Nunito-Regular'
  })

  expect(text2.getByText('Hello World')).toHaveStyle({
    color: colors.mono40,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold'
  })

  expect(text3.getByText('Hello World')).toHaveStyle({
    fontFamily: 'Nunito-SemiBold'
  })
})

it('renders correctly', () => {
  const snapshot = render(
    <Text color="red" fontSize={14} lineHeight={16} medium>
      Hello World
    </Text>
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
