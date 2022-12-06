import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  HomeAmountScreen,
  LanguageScreen,
  CategoriesScreen,
  CategoryModifyScreen
} from 'screens/index'
import { HomeTabBar } from './HomeTabBar'

const Stack = createNativeStackNavigator<StackParamList>()

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="HomeTabBar" component={HomeTabBar} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen name="HomeAmountScreen" component={HomeAmountScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="CategoryModifyScreen"
        component={CategoryModifyScreen}
      />
    </Stack.Navigator>
  )
}
