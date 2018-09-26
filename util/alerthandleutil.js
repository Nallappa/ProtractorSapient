


module.exports = class alerthandleutil {

    // alerthandleutil(){
    //     browser.wait(EC.alertIsPresent(), 5000);
    //     var alertDialog = browser.switchTo().alert();
    // }

    acceptalert() {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        alertDialog.accept();
    }

    dismissalert() {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        alertDialog.dismiss();
    }

    alerttext() {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        alertDialog.getText().then(function (text) {
            return text;
        })
    }

    alertsettext(text) {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        alertDialog.sendKeys(text);
    }

}
