const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')
const storePage = require('../pageobjects/store')
const checkout = require('../pageobjects/checkoutPage')
const TestData = require('../Utilities/constant')

describe('Add items to cart and complete order', () => {



    it('Verify items in cart are retained in cart after logout', async () => {
        await LoginPage.open()
        browser.maximizeWindow()
        await LoginPage.login(TestData.standard_user, TestData.password)
        await LoginPage.verifyLogin()
        await storePage.changeSortType("Price (low to high)")
        await storePage.addAndVerifyItemsInCart()
      

    })
      
      

    })

   



