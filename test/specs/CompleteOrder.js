const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const storePage = require('../pageobjects/store')
const checkout = require('../pageobjects/checkoutPage')
const TestData = require('../Utilities/constant')

describe('Add items to cart and complete order', () => {
    

    it('Add Items to cart', async () => {
        await LoginPage.open()
        browser.maximizeWindow()
        await LoginPage.login(TestData.standard_user, TestData.password)
        await LoginPage.verifyLogin()
        await storePage.changeSortType("Price (low to high)")
        await storePage.addItemsForCheckout()
       


    })

    it('Complete order and checkout', async () => {
        await checkout.validateCheckoutInfoPage(TestData.firstName, TestData.lastName,TestData.zip)
        await checkout.verifyCheckoutOverview()
        await checkout.checkoutOrderAndverify()
    })


    

})



