import { render } from '@testing-library/react-native'
import colors from 'libs/ui/colors'
import { FontFamily, Text } from '../Text'

it('renders text correctly', () => {
  const text = render(<Text>Hello World</Text>)

  expect(text.container.props.children).toEqual('Hello World')
})

it('renders the correct styles', () => {
  const styledText = render(
    <Text
      color={colors.mono40}
      fontSize={16}
      lineHeight={24}
      textAlign="center">
      Hello World
    </Text>
  )
  const boldText = render(<Text bold>Hello World</Text>)
  const semiBoldText = render(<Text semiBold>Hello World</Text>)
  const mediumText = render(<Text medium>Hello World</Text>)
  const extraBoldText = render(<Text extraBold>Hello World</Text>)
  const regularText = render(<Text regular>Hello World</Text>)

  expect(styledText.getByText('Hello World')).toHaveStyle({
    fontFamily: FontFamily.regular,
    color: colors.mono40,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  })

  expect(boldText.getByText('Hello World')).toHaveStyle({
    color: colors.mono100,
    fontSize: 14,
    textAlign: 'auto',
    fontFamily: FontFamily.bold
  })

  expect(semiBoldText.getByText('Hello World')).toHaveStyle({
    fontFamily: FontFamily.semiBold,
    color: colors.mono100,
    fontSize: 14,
    textAlign: 'auto'
  })

  expect(mediumText.getByText('Hello World')).toHaveStyle({
    fontFamily: FontFamily.medium,
    color: colors.mono100,
    fontSize: 14,
    textAlign: 'auto'
  })

  expect(extraBoldText.getByText('Hello World')).toHaveStyle({
    fontFamily: FontFamily.extraBold,
    color: colors.mono100,
    fontSize: 14,
    textAlign: 'auto'
  })

  expect(regularText.getByText('Hello World')).toHaveStyle({
    fontFamily: FontFamily.regular,
    color: colors.mono100,
    fontSize: 14,
    textAlign: 'auto'
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
