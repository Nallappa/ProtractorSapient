// /**
//  * Created by Nalli on 27-08-2018.
//  */



var OR = require("../json/OR.json");
var Base = require("../pages/BasePage.js");
var Home = require("../pages/HomePage.js");
var Customer = require("../pages/AddCustomerDetails.js");

describe('Bank Manager Login Test', function() {

    beforeEach(function () {
        isAngularSite(false); // isAngularSite(true), if it's an Angular app!
        Base.navigateToURL(OR.testsiteurl);
        browser.waitForAngular();
    });

    it('Login as Bank Manager', function() {
        Home.loginAsBankManager();
        // browser.sleep(5000);
    });

    it("Add Customer",function(){
        Customer.gotoAddCustomer();
        Customer.addCustomerInfo(OR.locators.addcustomerdetailspage.testdata.fName,OR.locators.addcustomerdetailspage.testdata.lName,OR.locators.addcustomerdetailspage.testdata.pCode);
    }) ;

    it("Open Account",function(){
        Customer.gotoOpenAccount();
        Customer.openAccount(OR.locators.addcustomerdetailspage.testdata.FullName,OR.locators.addcustomerdetailspage.testdata.currency);
        Customer.gotoSearchCustomer();
        Customer.validateCustomerRecords();
    }) ;

});













































// var base = require('./pages/BasePage.js');
//
// describe("BankManager Login Test",function(){
//
//     var OR = require('./json/OR.json');
//     var home_page = require('./pages/HomePage.js');
//
//    it("Login as Bank Manager",function(){
//
//        base.navigateToURL(OR.testsiteurl);
//        var customer = home_page.loginAsBankManager();
//        customer.gotoAddCustomer().addCustomerInfo(OR.locators.addcustomerdetailspage.fName,OR.locators.addcustomerdetailspage.lName,OR.locators.addcustomerdetailspage.pCode);
//        var title = base.getPageTitle();
//        expect(title).toBe("Protractor practice website - Banking App");
//        browser.sleep(3000);
//
//    }) ;
//
//
// });
