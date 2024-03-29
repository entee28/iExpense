import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Pressable } from '../Pressable'
import { Text } from '../Text'

it('renders children correctly', () => {
  const pressable = render(
    <Pressable>
      <Text color="red" testID="pressable_text">
        Hello
      </Text>
    </Pressable>
  )

  const text = pressable.getByTestId('pressable_text')
  expect(text.children).toContain('Hello')
  expect(text).toHaveStyle({
    color: 'red'
  })
})

it('correctly handles press event', () => {
  const onPress = jest.fn()

  const pressable = render(<Pressable testID="pressable" onPress={onPress} />)

  fireEvent.press(pressable.getByTestId('pressable'))
  expect(onPress).toHaveBeenCalled()
})

it('renders styles correctly', () => {
  const pressable = render(
    <Pressable
      width={300}
      height={300}
      backgroundColor="red"
      style={{ alignItems: 'center' }}
      testID="pressable"
    />
  )

  expect(pressable.getByTestId('pressable')).toHaveStyle({
    width: 300,
    height: 300,
    backgroundColor: 'red',
    alignItems: 'center'
  })
})

it('renders correctly', () => {
  const snapshot = render(
    <Pressable
      alignItems="center"
      justifyContent="center"
      onPress={() => {}}
      style={{ backgroundColor: 'red' }}>
      <Text color="red">Hello</Text>
    </Pressable>
  ).toJSON()

  expect(snapshot).toMatchSnapshot()
})
