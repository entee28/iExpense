import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, InsightScreen, SettingScreen } from 'screens/index'
import {
  faChartColumn,
  faGear,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import colors from 'libs/ui/colors'

const Tab = createBottomTabNavigator<HomeTabBarParamList>()

export const HomeTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: tabBarIconProps => (
            <FontAwesomeIcon
              color={
                tabBarIconProps.focused ? colors.primary100 : colors.mono40
              }
              icon={faWallet}
              size={24}
            />
          )
        }}
      />
      <Tab.Screen
        name="InsightScreen"
        component={InsightScreen}
        options={{
          tabBarIcon: tabBarIconProps => (
            <FontAwesomeIcon
              color={
                tabBarIconProps.focused ? colors.primary100 : colors.mono40
              }
              icon={faChartColumn}
              size={24}
            />
          )
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: tabBarIconProps => (
            <FontAwesomeIcon
              color={
                tabBarIconProps.focused ? colors.primary100 : colors.mono40
              }
              icon={faGear}
              size={24}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
