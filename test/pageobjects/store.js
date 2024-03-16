const { $ } = require('@wdio/globals')
const Page = require('./page');
const CommonUtil = require('../Utilities/CommonUtil');
const assert = require('assert');
const constant = require('../Utilities/constant');
const loginPage = require('./login.page');

/**
 * Page Selectors
 */
class store extends Page {
   
   
    get dropdownButton () { return $("//select[@class='product_sort_container']");  }
    get addFirstItem(){ return $("#add-to-cart-sauce-labs-onesie");}
    get addFirstItem(){ return $("#add-to-cart-sauce-labs-onesie");}   
    get addSecondItem(){return $("#add-to-cart-sauce-labs-bike-light");}   
    get addThirdItem(){ return $("#add-to-cart-sauce-labs-bolt-t-shirt"); }
    get firstItemName(){return $("(//div[@class='inventory_item_name '])[1]"); }
    get secondItemName(){ return $("(//div[@class='inventory_item_name '])[2]");}
    get thirdItemName(){return $("(//div[@class='inventory_item_name '])[3]");}
    get firstItemNameCartText(){return $("(//div[@class='inventory_item_name'])[1]");}
    get secondItemNameCartText(){ return $("(//div[@class='inventory_item_name'])[2]"); }
    get thirdItemNameCartText(){return $("(//div[@class='inventory_item_name'])[3]");}
    get cartLink(){return $("//a[@class='shopping_cart_link']");}   
    get logoutButton(){return $("#logout_sidebar_link");}
    get threeLinesMenu(){return $("#react-burger-menu-btn");}
    get checkoutButton(){return $("#checkout");}
    get checkoutHeader(){return $("//span[text()='Checkout: Your Information']");}
    
    continueButton = "#continue"
    defaultDropdownValue = "//span[@class='active_option' and text() = 'Name (A to Z)']"
    ItemNames = "//div[@class='inventory_item_name ']"
    ItemPrice = "(//div[@class='inventory_item_price'])"



 /**
     *Page Methods
     */

    async verifyDefaultSortOrder(){
        await CommonUtil.assertElementVisible(this.defaultDropdownValue);
        console.log("sort order verified")

        const elements = await browser.$$(this.ItemNames);


        const texts = [];
        for (const element of elements) {
            const text = await element.getText();
            console.log(text)
            texts.push(text);
        }
    
      
        for (let i = 0; i < texts.length - 1; i++) {
            const currentText = texts[i];
            const nextText = texts[i + 1];
            if (currentText.localeCompare(nextText) > 0) {
                console.error('The list is not sorted alphabetically.');
                await browser.deleteSession();
                assert.fail('The list is not sorted alphabetically.');
                
            }
        }
    
        
        assert.ok(true, 'The list is sorted A-Z.');
        console.log('The list is sorted alphabetically.');
    

    }


    async changeSortType(option){
            await this.dropdownButton.click()
            await this.dropdownButton.selectByVisibleText(option);
    }   


    async verifySortOrder(){
        
        const elements = await browser.$$(this.ItemPrice);
    

        let prevValue = Number.NEGATIVE_INFINITY;

    
    for (const element of elements) {
        const text = await element.getText();
        const num = text.replace('$', '')
        const value = parseFloat(num);
        console.log(value)


       
        assert(value >= prevValue, 'The list is not in ascending order.');

    
        prevValue = value;


        
    }
    console.log("All Assertions Passed successfully")
}

    async addAndVerifyItemsInCart(){
        
        const firstItemName = await this.firstItemName.getText();
        const secondItemName = await this.secondItemName.getText();
        const thirdItemName = await this.thirdItemName.getText();
        
        await this.addFirstItem.click()
        await this.addSecondItem.click()
        await this.addThirdItem.click()

        await this.cartLink.click()

        

        await this.threeLinesMenu.click()
        await this.logoutButton.click()

        await loginPage.login('standard_user', 'secret_sauce')
        await loginPage.verifyLogin()

        await this.cartLink.click()

        await this.firstItemNameCartText.waitForDisplayed()
        const firstItemNameCart = await this.firstItemNameCartText.getText();
        const secondItemNameCart = await this.secondItemNameCartText.getText();
        const thirdItemNameCart = await this.thirdItemNameCartText.getText();



        assert.equal(firstItemNameCart, firstItemName, "First Item didn't match")
        assert.equal(secondItemNameCart, secondItemName, "Second Item didn't match")
        assert.equal(thirdItemNameCart, thirdItemName, "Third Item didn't match")

        console.log("All assertions Passed Successfully")

    }
   
/**
 * Method to add highest and lowest value item to cart
 */
    async addItemsForCheckout(){
        
    const elements = await browser.$$("(//div[@class='inventory_item_price'])");


    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;


    for (const element of elements) {
        const text = await element.getText();
        const num = text.replace('$', '')
        const value = parseFloat(num);
        
        
        if (!isNaN(value)) {
            if (value < minValue) {
                minValue = value;
            }
            if (value > maxValue) {
                maxValue = value;
            }
        }
    }

    console.log('Minimum value:', minValue);
    console.log('Maximum value:', maxValue);

    const minvalueItem = await browser.$(`//div[@class="pricebar"]/div[text()='${minValue}']/following-sibling::button`);
    const maxvalueItem = await browser.$(`//div[@class="pricebar"]/div[text()='${maxValue}']/following-sibling::button`);


    await minvalueItem.click();
    await maxvalueItem.click();

    await this.cartLink.click();

    }


    
 


}

module.exports = new store();
