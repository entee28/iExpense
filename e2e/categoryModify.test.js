const { element } = require('detox')

describe('Category Modifying Flow', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await element(by.id('home_tab_bar.setting_screen')).tap()
  })

  it('should be able to create, update, delete expense category', async () => {
    await element(by.id('setting_screen.categories')).tap()

    // create new category
    await element(by.id('categories_list.flat_list')).scroll(500, 'down')
    await element(by.id('categories_list.add_category_btn')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('New Expense Category')
    await element(by.id('category_modify.category_input')).typeText(
      'Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.categories_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Category'))).toBeVisible()
    await element(by.text('Incomes')).tap()
    await expect(element(by.text('Test Category'))).not.toBeVisible() // make sure newly created expense category not appear in income category list
    await element(by.text('Expenses')).tap()

    // update existing category
    await element(by.text('Test Category')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('Edit Category')
    await expect(element(by.id('category_modify.category_input'))).toHaveText(
      'Test Category'
    )
    await element(by.id('category_modify.category_input')).replaceText(
      'Updated Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.categories_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Category'))).not.toBeVisible()
    await expect(element(by.text('Updated Test Category'))).toBeVisible()

    // delete category
    await element(by.id('categories_screen.edit_btn')).tap()
    await element(
      by.id('category_list_item.Updated Test Category_delete_btn')
    ).tap()
    await expect(element(by.text('Delete'))).toBeVisible()
    await element(by.text('Delete')).tap()
    await expect(element(by.text('Updated Test Category'))).not.toBeVisible()
  })

  it('should be able to create, update, delete income category', async () => {
    await element(by.id('setting_screen.categories')).tap()

    // create new category
    await element(by.text('Incomes')).tap()
    await element(by.id('categories_list.add_category_btn')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('New Income Category')
    await element(by.id('category_modify.category_input')).typeText(
      'Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.categories_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Category'))).toBeVisible()
    await element(by.text('Expenses')).tap()
    await element(by.id('categories_list.flat_list')).scroll(500, 'down')
    await expect(element(by.text('Test Category'))).not.toBeVisible() // make sure newly created income category not appear in expense category list
    await element(by.text('Incomes')).tap()

    // update existing category
    await element(by.text('Test Category')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('Edit Category')
    await expect(element(by.id('category_modify.category_input'))).toHaveText(
      'Test Category'
    )
    await element(by.id('category_modify.category_input')).replaceText(
      'Updated Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.categories_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Category'))).not.toBeVisible()
    await expect(element(by.text('Updated Test Category'))).toBeVisible()

    // delete category
    await element(by.id('categories_screen.edit_btn')).tap()
    await element(
      by.id('category_list_item.Updated Test Category_delete_btn')
    ).tap()
    await expect(element(by.text('Delete'))).toBeVisible()
    await element(by.text('Delete')).tap()
    await expect(element(by.text('Updated Test Category'))).not.toBeVisible()
  })

  it('should be able to create, update, delete account', async () => {
    await element(by.id('setting_screen.accounts')).tap()

    // create new account
    await element(by.id('categories_list.add_category_btn')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('New Account')
    await element(by.id('category_modify.category_input')).typeText(
      'Test Account'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.account_list_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Account'))).toBeVisible()

    // update existing account
    await element(by.text('Test Account')).tap()
    await expect(
      element(by.id('navigation_bar.category_modify_screen_title'))
    ).toHaveText('Edit Account')
    await expect(element(by.id('category_modify.category_input'))).toHaveText(
      'Test Account'
    )
    await element(by.id('category_modify.category_input')).replaceText(
      'Updated Test Account'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await expect(
      element(by.id('navigation_bar.account_list_screen'))
    ).toBeVisible()
    await expect(element(by.text('Test Account'))).not.toBeVisible()
    await expect(element(by.text('Updated Test Account'))).toBeVisible()

    // delete category
    await element(by.id('account_list_screen.edit_btn')).tap()
    await element(
      by.id('category_list_item.Updated Test Account_delete_btn')
    ).tap()
    await expect(element(by.text('Delete'))).toBeVisible()
    await element(by.text('Delete')).tap()
    await expect(element(by.text('Updated Test Account'))).not.toBeVisible()
  })
})
