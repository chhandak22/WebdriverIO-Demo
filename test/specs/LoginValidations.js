const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const TestData = require('../Utilities/constant')

describe('Login validations', () => {
    it('"standard_user" Should be able to login Succesfully', async () => {
        await LoginPage.open()
        browser.maximizeWindow()
        await LoginPage.login(TestData.standard_user, TestData.password)
        await LoginPage.verifyLogin()
        await LoginPage.Logout()


    })

    it('"performance_glitch_user" Should be able to login Succesfully', async () => {
        await LoginPage.open()
        browser.maximizeWindow()
        await LoginPage.login(TestData.glitch_user, TestData.password)
        await LoginPage.verifyLogin()
        await LoginPage.Logout()

    })

    it(' "locked_out_user" Login Scenario', async () => {
        await LoginPage.open()
        browser.maximizeWindow()
        await LoginPage.login(TestData.locked_user, TestData.password)
        await LoginPage.verifyLockedOutUserLogin()
             

    })

   


    

})



