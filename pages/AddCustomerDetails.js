var LocatorsAddcustomerpage = require('../locators/addcustomerlocators.json');
var dataaddcustomerpage = require('../data/Addcustomerdata.json');
var Addcustomerloactors = require('../objects/objcustomerpage.js');
var WebElementutil = require('../util/webelementutil.js');
var Alerthandleutil = require('../util/alerthandleutil.js');
var Dropdownutil = require('../util/dropdownutil.js');


var webutil = new WebElementutil();
// var locatoraddcustomerpage = new LocatorsAddcustomerpage();
// var dataaddcustomerpage = new DataAddcustomerpage();
var dropdownutil = new Dropdownutil();
var objcustomerpage = new Addcustomerloactors();

module.exports = class Addcustomerdetails {

    gotoAddCustomer(){
        Addcustomerdetails.AddCustomer.click();
        // objcustomerpage.AddCustomer;
    };

    gotoOpenAccount(){
        objcustomerpage.OpenAccount.click();
    };

    gotoSearchCustomer(){
        objcustomerpage.SearchCustomer.click();
    };

    addCustomerInfo(){
        objcustomerpage.fname.clear();
        objcustomerpage.fname.sendKeys(dataaddcustomerpage.fName);
        objcustomerpage.lname.clear();
        objcustomerpage.lname.sendKeys(dataaddcustomerpage.lName);
        objcustomerpage.pcode.clear();
        objcustomerpage.pcode.sendKeys(dataaddcustomerpage.pCode);
        objcustomerpage.addcustomerbutton.click();
        var alertutil = new Alerthandleutil();
        alertutil.acceptalert();
    };

    openAccount(){
        dropdownutil.selectbytext(objcustomerpage.customerdropdown,dataaddcustomerpage.FullName);
        dropdownutil.selectbytext(objcustomerpage.currencydropdown,dataaddcustomerpage.currency);
        objcustomerpage.processbutton.click();
        var alertutil = new Alerthandleutil();
        alertutil.acceptalert();
    };

}