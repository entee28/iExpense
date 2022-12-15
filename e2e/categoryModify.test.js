const { element } = require('detox')

describe('Category Modifying Flow', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await element(by.id('home_tab_bar.setting_screen')).tap()
    await element(by.id('setting_screen.categories')).tap()
  })

  it('should be able to create, update, delete expense category', async () => {
    // create new category
    await element(by.id('categories_list.flat_list')).scroll(500, 'down')
    await element(by.id('categories_list.add_category_btn')).tap()
    await waitFor(element(by.id('navigation_bar.new_expense_category')))
      .toBeVisible()
      .withTimeout(1500)
    await element(by.id('category_modify.category_input')).typeText(
      'Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await waitFor(element(by.id('navigation_bar.categories_screen')))
      .toBeVisible()
      .withTimeout(1000)
    await expect(element(by.text('Test Category'))).toBeVisible()
    await element(by.text('Incomes')).tap()
    await expect(element(by.text('Test Category'))).not.toBeVisible() // make sure newly created expense category not appear in income category list
    await element(by.text('Expenses')).tap()

    // update existing category
    await element(by.text('Test Category')).tap()
    await waitFor(element(by.id('navigation_bar.edit_expense_category')))
      .toBeVisible()
      .withTimeout(1500)
    await element(by.id('category_modify.category_input')).replaceText(
      'Updated Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await waitFor(element(by.id('navigation_bar.categories_screen')))
      .toBeVisible()
      .withTimeout(1000)
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
    // create new category
    await element(by.text('Incomes')).tap()
    await element(by.id('categories_list.add_category_btn')).tap()
    await waitFor(element(by.id('navigation_bar.new_income_category')))
      .toBeVisible()
      .withTimeout(1500)
    await element(by.id('category_modify.category_input')).typeText(
      'Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await waitFor(element(by.id('navigation_bar.categories_screen')))
      .toBeVisible()
      .withTimeout(1000)
    await expect(element(by.text('Test Category'))).toBeVisible()
    await element(by.text('Expenses')).tap()
    await element(by.id('categories_list.flat_list')).scroll(500, 'down')
    await expect(element(by.text('Test Category'))).not.toBeVisible() // make sure newly created income category not appear in expense category list
    await element(by.text('Incomes')).tap()

    // update existing category
    await element(by.text('Test Category')).tap()
    await waitFor(element(by.id('navigation_bar.edit_income_category')))
      .toBeVisible()
      .withTimeout(1500)
    await element(by.id('category_modify.category_input')).replaceText(
      'Updated Test Category'
    )
    await element(by.id('category_modify.done_btn')).tap()
    await waitFor(element(by.id('navigation_bar.categories_screen')))
      .toBeVisible()
      .withTimeout(1000)
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
})
