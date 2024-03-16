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
    get logoutButton(){return $("#logout_sidebar_link");}
    get threeLinesMenu(){return $("#react-burger-menu-btn");}

    AppHeader = "//div[text()='Swag Labs']"
    errorTextXpath = "//h3[text()='Epic sadface: Sorry, this user has been locked out.']";
    LoginPageUsernameArea = "//div[@class='login_credentials_wrap-inner']"



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

    async Logout(){
        await this.threeLinesMenu.click();
        await this.logoutButton.waitForClickable()
        await this.logoutButton.click();
        await CommonUtil.assertElementVisible(this.LoginPageUsernameArea)



    }


}

module.exports = new LoginPage();
