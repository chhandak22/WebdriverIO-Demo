const { $ } = require('@wdio/globals')
const Page = require('./page');
const CommonUtil = require('../Utilities/CommonUtil');
const assert = require('assert');
const constant = require('../Utilities/constant');
const loginPage = require('./login.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class checkout extends Page {


    get checkoutButton(){ return $("#checkout"); }
    get checkoutHeader(){ return $("//span[text()='Checkout: Your Information']"); }
    get continuneBtn(){ return $("#continue"); }
    get firstNametextField(){ return $("#first-name"); }
    get lastNametextField(){ return $("#last-name"); }
    get zipTextField(){ return $("#postal-code"); }
    get firstItemValueText(){ return $("(//div[@class='inventory_item_price'])[1]"); }
    get secondItemValueText(){ return $("(//div[@class='inventory_item_price'])[2]"); }
    get taxValueText(){ return $("//div[@class='summary_tax_label']"); }
    get totalValueText(){ return $("//div[@class='summary_info_label summary_total_label']"); }
    get FinishButton(){ return $("#finish"); }
    get BackHomeButton(){ return $("#back-to-products"); }
    
    
    ErrorTextXpath1 = "//h3[text()='Error: First Name is required']"
    ErrorTextXpath2 = "//h3[text()='Error: Last Name is required']"
    ErrorTextXpath3 = "//h3[text()='Error: Postal Code is required']"

    firstNameSVGTag = "(//*[local-name()='svg'])[1]/parent::div/input[@id='first-name']"
    lastNameSVGTag = "(//*[local-name()='svg'])[2]/parent::div/input[@id='last-name']"
    zipCodeSVGTag = "(//*[local-name()='svg'])[3]/parent::div/input[@id='postal-code']"
    continueButton = "#continue"
    overviewHeader = "//span[text()='Checkout: Overview']"
    orderConfirmationText = "//h2[text()='Thank you for your order!']"


    
   






    async validateCheckoutInfoPage(fname,lname,zip){
        await this.checkoutButton.click();
        await this.checkoutHeader.waitForDisplayed();
        await this.continuneBtn.click();
        
        await CommonUtil.assertElementVisible(this.ErrorTextXpath1)
        await CommonUtil.assertElementVisible(this.firstNameSVGTag)
        await CommonUtil.assertElementVisible(this.zipCodeSVGTag)
        await CommonUtil.assertElementVisible(this.lastNameSVGTag)


        await this.firstNametextField.clearValue();
        await this.firstNametextField.setValue(fname)
        await this.continuneBtn.click();
        await CommonUtil.assertElementVisible(this.ErrorTextXpath2)
        
        
        await this.lastNametextField.clearValue();
        await this.lastNametextField.setValue(lname)
        await this.continuneBtn.click();
        await CommonUtil.assertElementVisible(this.ErrorTextXpath3)

        await this.zipTextField.clearValue();
        await this.zipTextField.setValue(zip);

        await this.continuneBtn.click();
        await CommonUtil.assertElementVisible(this.overviewHeader)

         

        console.log("All assertions passed")


    
    }

    async verifyCheckoutOverview(){
        const firstItemText = await this.firstItemValueText.getText();
        const num1 = firstItemText.replace('$', '')
        const value1 = parseFloat(num1);
        console.log(value1)
        
        const secondItemText = await this.secondItemValueText.getText();
        const num2 = secondItemText.replace('$', '')
        const value2 = parseFloat(num2);
        console.log(value2)
        
        const TaxText = await this.taxValueText.getText();
        const num3 = TaxText.replace('Tax: $', '')
        const taxNum = parseFloat(num3);
        console.log(num1)
        
        const totalText = await this.totalValueText.getText();
        const num4 = totalText.replace('Total: $', '')
        const TotalActual = parseFloat(num4);
        console.log(TotalActual)


        const TotalExpected = (value1*100 + value2*100 + taxNum*100)/100;
        console.log(TotalExpected)
        
        assert.equal(TotalExpected, TotalActual, "Total did not match")

        console.log("Total Matched")

        
    }

    async checkoutOrderAndverify(){
        await this.FinishButton.click();
        await CommonUtil.assertElementVisible(this.orderConfirmationText)
        await this.BackHomeButton.click();
        await CommonUtil.assertElementVisible(loginPage.AppHeader)

        console.log("All Passed")


        

    }

   


}

module.exports = new checkout();