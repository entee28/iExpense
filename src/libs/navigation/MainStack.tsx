import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeTabBar } from './HomeTabBar'

const Stack = createNativeStackNavigator<StackParamList>()

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="HomeTabBar" component={HomeTabBar} />
    </Stack.Navigator>
  )
}
