/**
 * Created by Nalli
 */

module.exports = class BasePage {

    navigateToURL(url){
        browser.get(url);
    }

    getPageTitle(){
        return browser.getTitle();
    }

    closebrowser(){
        driver.quit();
    }

}
