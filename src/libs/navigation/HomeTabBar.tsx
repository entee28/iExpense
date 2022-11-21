import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {HomeScreen, InsightScreen, SettingScreen} from 'screens/index'

const Tab = createBottomTabNavigator<HomeTabBarParamList>()

export const HomeTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="InsightScreen" component={InsightScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  )
}
