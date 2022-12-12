import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  HomeAmountScreen,
  LanguageScreen,
  CategoriesScreen,
  CategoryModifyScreen,
  AccountListScreen,
  CurrencyScreen,
  EntryScreen
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
      <Stack.Screen name="AccountListScreen" component={AccountListScreen} />
      <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} />
      <Stack.Screen
        name="CategoryModifyScreen"
        component={CategoryModifyScreen}
      />
      <Stack.Screen name="EntryScreen" component={EntryScreen} />
    </Stack.Navigator>
  )
}
