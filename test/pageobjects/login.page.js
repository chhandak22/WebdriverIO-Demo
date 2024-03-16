const { $ } = require('@wdio/globals')
const Page = require('./page');
const CommonUtil = require('../Utilities/CommonUtil');
const assert = require('assert');
const constant = require('../Utilities/constant');

/**
 * Page Selectors
 */
class LoginPage extends Page {

    get inputUsername () { return $('#user-name');}
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $('#login-button');}
    get errorMessage () { return $("//h3[text()='Epic sadface: Sorry, this user has been locked out.']");}

    AppHeader = "//div[text()='Swag Labs']"
    errorTextXpath = "//h3[text()='Epic sadface: Sorry, this user has been locked out.']";



    /**
     * Page related methods
     */
    async login (username, password) {
        await this.inputUsername.clearValue()
        await this.inputUsername.setValue(username);
        await this.inputPassword.clearValue()
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
  }


  
    open () {
        return super.open();
    }


    async verifyLogin(){
        await CommonUtil.assertElementVisible(this.AppHeader)
        console.log("Element Found")
    }


    async verifyLockedOutUserLogin(){
        await CommonUtil.assertElementVisible(this.errorTextXpath)
        console.log("Error Message shown")
        

    }


}

module.exports = new LoginPage();
