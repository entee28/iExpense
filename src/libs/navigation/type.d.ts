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
  LanguageScreen: undefined
  CurrencyScreen: undefined
  HomeAmountScreen: undefined
  CategoriesScreen: undefined
  AccountListScreen: undefined
  RegisterScreen: undefined
  LoginScreen: undefined
  CategoryModifyScreen: {
    icon?: string
    category?: string
    id?: string
    option:
      | 'edit_expense_category'
      | 'edit_income_category'
      | 'edit_account'
      | 'new_account'
      | 'new_expense_category'
      | 'new_income_category'
  }
  EntryScreen: {
    entry?: Entry
  }
  UserProfileScreen: undefined
}
