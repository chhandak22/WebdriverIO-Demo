const assert = require('assert');
const { remote } = require('webdriverio');

class CommonUtil{
    
    
    doPageTitle(){
        return browser.getTitle();
    }
    
    async assertElementVisible(selector) {             
        const element = await browser.$(selector);           
        const isVisible = await element.isDisplayed();
        assert.ok(isVisible, `Element with selector '${selector}' should be visible.`);
    }

    
    }
    module.exports = new CommonUtil()