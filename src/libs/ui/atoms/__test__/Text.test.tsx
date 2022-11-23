import { render } from '@testing-library/react-native'
import colors from 'libs/ui/colors'
import { SupportedFontFamily, Text } from '../Text'

it('renders text correctly', () => {
  const text = render(<Text>Hello World</Text>)

  expect(text.container.props.children).toEqual('Hello World')
})

it('renders the correct font', () => {
  const text1 = render(
    <Text useFontFamily={SupportedFontFamily.NUNITO} semiBold>
      Hello World
    </Text>
  )

  const text2 = render(
    <Text useFontFamily={SupportedFontFamily.MULI} bold>
      Hello World
    </Text>
  )

  expect(text1.getByText('Hello World')).toHaveStyle({
    fontFamily: 'Nunito-SemiBold'
  })

  expect(text2.getByText('Hello World')).toHaveStyle({
    fontFamily: 'Muli-Bold'
  })
})

it('renders the correct styles', () => {
  const text1 = render(<Text>Hello World</Text>)
  const text2 = render(
    <Text
      color={colors.mono40}
      fontSize={16}
      lineHeight={24}
      textAlign="center">
      Hello World
    </Text>
  )

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
    fontFamily: 'Nunito-Regular'
  })
})

it('renders correctly', () => {
  const snapshot = render(
    <Text color="red" fontSize={14} lineHeight={16}>
      Hello World
    </Text>
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
