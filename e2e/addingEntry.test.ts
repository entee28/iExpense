import { expect } from 'detox'

describe('Adding Entry Flow', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('amount input should function as expected', async () => {
    await element(by.id('home_screen.add_btn')).tap()
    await expect(
      element(by.id('navigation_bar.entry_screen_title'))
    ).toHaveText('Expense')
    await element(by.text('1')).tap()
    await element(by.text('2')).tap()
    await element(by.text('3')).tap()
    await element(by.text('4')).tap()
    await element(by.text('5')).tap()
    await expect(element(by.id('entry_screen.primary_amount'))).toHaveText(
      '12,345'
    )
    await element(by.text('.')).tap()
    await element(by.text('6')).tap()
    await element(by.text('7')).tap()
    await element(by.text('8')).tap()
    await element(by.text('9')).tap()
    await element(by.text('9')).tap()
    await expect(element(by.id('entry_screen.primary_amount'))).toHaveText(
      '12,345.6789'
    )
    await element(by.id('keyboard.key_del')).multiTap(11)
    await expect(element(by.id('entry_screen.primary_amount'))).toHaveText('0')
  })

  // it('should be able to add, update, delete an entry', async () => {
  //   await element(by.id('home_screen.add_btn')).tap()
  //   await element(by.id('keyboard.key_2')).multiTap(6)
  //   await element(by.id('entry_screen.note_input')).typeText('Test note')
  //   await element(by.id('entry_screen.save_btn')).tap()
  //   await expect(element(by.id('expense_item.category_icon'))).toHaveText('🍉')
  //   await expect(element(by.id('expense_item.category_name'))).toHaveText(
  //     'Groceries'
  //   )
  //   await expect(element(by.id('expense_item.amount'))).toHaveText(
  //     '222,222.0 ₫'
  //   )

  //   await element(by.text('Groceries')).tap()
  //   await expect(element(by.id('entry_screen.primary_amount'))).toHaveText(
  //     '222,222.00'
  //   )
  //   await expect(element(by.text('Test note'))).toBeVisible()
  //   await expect(element(by.text('Groceries'))).toBeVisible()
  //   await element(by.id('keyboard.key_del')).multiTap(4)
  //   await element(by.id('entry_screen.note_input')).replaceText(
  //     'Test note updated'
  //   )
  //   await element(by.id('entry_screen.to_category')).tap()
  //   await element(by.id('category_picker.scroll_view')).scroll(400, 'down')
  //   await element(by.text('Salary')).tap()
  //   await element(by.id('entry_screen.save_btn')).tap()
  //   await expect(element(by.id('expense_item.category_icon'))).toHaveText('💸')
  //   await expect(element(by.id('expense_item.category_name'))).toHaveText(
  //     'Salary'
  //   )
  //   await expect(element(by.id('expense_item.amount'))).toHaveText('22,222.0 ₫')

  //   await element(by.text('Salary')).tap()
  //   await expect(element(by.text('Test note updated'))).toBeVisible()
  //   await element(by.id('entry_screen.delete_btn')).tap()
  //   await expect(element(by.text('Salary'))).not.toBeVisible()
  // })
})
