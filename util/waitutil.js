

module.exports = class waitutil {

    AngularWait () {
        browser.waitForAngular();
        // return this;
    }

    WaitForElement(element) {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element), 30000);
    }

    FluentWait(element) {
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(function (element) {
            browser.sleep(2000);
            return element(by.id('name')).isDisplayed()
                .then(
                    function (isDisplayed) {
                        return isDisplayed;
                    },
                    function (error) {
                        return false
                    });
        }, 20 * 1000);
    }


}
