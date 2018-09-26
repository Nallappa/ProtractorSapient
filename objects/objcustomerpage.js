var locatoraddcustomerpage = require('../locators/addcustomerlocators.json');
var WebElementutil = require('../util/webelementutil.js');
var dataaddcustomerpage = require('../data/Addcustomerdata.json');
var Alerthandleutil = require('../util/alerthandleutil.js');
var Dropdownutil = require('../util/dropdownutil.js');
var Waitutil = require("../util/waitutil.js");
var waitutil = new Waitutil();


var webutil = new WebElementutil();
var dropdownutil = new Dropdownutil();



module.exports = class objcustomerpage {


    SearchCustomer(){
        return webutil.Webelementreturn(locatoraddcustomerpage.searchcustomer);
    };

    fname(){
        return webutil.Webelementreturn(locatoraddcustomerpage.fName);
    };
    lname(){
        return webutil.Webelementreturn(locatoraddcustomerpage.lName);
    };
    pcode(){
        return webutil.Webelementreturn(locatoraddcustomerpage.pCode);
    };

    addcustomerbutton(){
        return webutil.Webelementreturn(locatoraddcustomerpage.addcustomer);
    };

    customerdropdown(){
        return webutil.Webelementreturn(locatoraddcustomerpage.customer);
    };

    currencydropdown(){
        return webutil.Webelementreturn(locatoraddcustomerpage.currency);
    };
    processbutton(){
        return webutil.Webelementreturn(locatoraddcustomerpage.processbutton);
    };

    gotoAddCustomer(){
        webutil.Webelementreturn(locatoraddcustomerpage.addcustomerbutton).click();
        // objcustomerpage.AddCustomer;
    };

    gotoSearchCustomer(){
        webutil.Webelementreturn(locatoraddcustomerpage.searchcustomer).click();
    };

    addCustomerInfo(){
        // browser.waitForAngular();
        waitutil.WaitForElement(webutil.Webelementreturn(locatoraddcustomerpage.fName))
        // browser.sleep(3000);
        webutil.Webelementreturn(locatoraddcustomerpage.fName).clear();
        webutil.Webelementreturn(locatoraddcustomerpage.fName).sendKeys(dataaddcustomerpage.fName);
        webutil.Webelementreturn(locatoraddcustomerpage.lName).clear();
        webutil.Webelementreturn(locatoraddcustomerpage.lName).sendKeys(dataaddcustomerpage.lName);
        webutil.Webelementreturn(locatoraddcustomerpage.pCode).clear();
        webutil.Webelementreturn(locatoraddcustomerpage.pCode).sendKeys(dataaddcustomerpage.pCode);
        expect( webutil.Webelementreturn(locatoraddcustomerpage.addcustomer).isDisplayed()).toBe(true);
        webutil.Webelementreturn(locatoraddcustomerpage.addcustomer).click();
        browser.sleep(5000);
        var alertutil = new Alerthandleutil();
        alertutil.acceptalert();
    };

    OpenAccount(){

        console.log("about to click");
        waitutil.WaitForElement(webutil.Webelementreturn(locatoraddcustomerpage.openAccount))
        webutil.Webelementreturn(locatoraddcustomerpage.openAccount).click();
        console.log("its clickied");
        waitutil.AngularWait();
        waitutil.WaitForElement(webutil.Webelementreturn(locatoraddcustomerpage.customer));
        // dropdownutil.selectbypartialtext(webutil.Webelementreturn(locatoraddcustomerpage.customer),dataaddcustomerpage.FullName);
        // dropdownutil.selectbypartialtext(webutil.Webelementreturn(locatoraddcustomerpage.currency),dataaddcustomerpage.currency);
        // webutil.Webelementreturn(locatoraddcustomerpage.processbutton).click();
        // var alertutil = new Alerthandleutil();
        // alertutil.acceptalert();
    };




}