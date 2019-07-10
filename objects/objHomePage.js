



// var AddCustomer = require("../rough/AddCustomerDetails.js");
// var BasePage = require("../rough/BasePage.js");
var LocatorsHomepage = require('../locators/homepagelocators.json');
var WebElementutil = require('../util/webelementutil.js');


var webutil = new WebElementutil();

module.exports = class objHomepage {

    Bankmanager() {
        return webutil.Webelementreturn(LocatorsHomepage.BankManagerbutton);
    }

    Customer() {
        return webutil.Webelementreturn(LocatorsHomepage.Customerbutton);

    }
    
    getname() {
   
        return webutil.Webelementreturn(LocatorsHomepage.yourname)
    }
    

}