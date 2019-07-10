

/**
 * Created by Nalli on 27-08-2018.
 */

var ORCommondata = require("./data/commondata.json");
var BasePage = require("./pages/BasePage.js");
var HomePage = require("./pages/HomePage.js");
// var CustomerPage = require("./pages/Addcustomerdetails.js");
var CustomerPage = require("./objects/objcustomerpage.js");

var base = new BasePage();
var home = new HomePage();
var Customer = new CustomerPage();

beforeAll(function () {
    isAngularSite(false); // isAngularSite(true), if it's an Angular app!
    base.navigateToURL(ORCommondata.testsiteurl);
    browser.waitForAngular();
});

describe('Bank Manager Login Test', function() {

  xit('Login as Bank Manager', function() {
      home.loginAsBankManager();
      Customer.gotoAddCustomer();
      Customer.addCustomerInfo();
      // Customer.gotoOpenAccount();
      Customer.OpenAccount();
      Customer.gotoSearchCustomer();
      // Customer.validateCustomerRecords();
  });

  
  it('Login as loginAsCustomer', function() {
    home.loginAsCustomer();
    // Customer.gotoAddCustomer();
    // Customer.addCustomerInfo();
    // Customer.gotoOpenAccount();
    // Customer.OpenAccount();
    // Customer.gotoSearchCustomer();
    // Customer.validateCustomerRecords();
});
  
}); 



































