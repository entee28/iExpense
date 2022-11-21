declare type HomeTabBarParamList = {
  HomeScreen: undefined
  InsightScreen: undefined
  SettingScreen: undefined
}

declare type StackParamList = {
  /**
   * Home tab bar
   */
  HomeTabBar: NavigatorScreenParams<HomeTabBarParamList>
}
