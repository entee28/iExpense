import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { Box } from '../Box'

it('renders children components correctly', () => {
  const box = render(
    <Box>
      <Text testID="text_children">Hello World</Text>
    </Box>
  )

  const text = box.getByTestId('text_children')
  expect(text.children).toContain('Hello World')
})

it('renders styles correctly', () => {
  const box = render(
    <Box width={300} height={300} backgroundColor="red" testID="red_box" />
  )

  expect(box.getByTestId('red_box')).toHaveStyle({
    width: 300,
    height: 300,
    backgroundColor: 'red'
  })
})

it('renders correctly', () => {
  const snapshot = render(
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor="red">
      <Text>Hello World</Text>
    </Box>
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
