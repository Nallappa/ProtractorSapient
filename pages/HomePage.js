/**
 * Created by Nalli on 27-08-2018.
 */
// require('../util/customlocators.js');
// var Generic = require("../util/GenericFunctions.js");
var ObjHomePage = require("../objects/objHomePage.js");
var WebElementutil = require("../util/waitutil.js");
var waitutil = new WebElementutil();

var Home = new ObjHomePage();

module.exports = class Homepage {

        loginAsBankManager(){
            // browser.sleep(3000);
            waitutil.WaitForElement(Home.Bankmanager())
             Home.Bankmanager().click();
            browser.sleep(2000);
            // LoginasBankManager.submit();
    };
    
    loginAsCustomer() {
        browser.sleep(5000);
        Home.Customer().click();
        browser.sleep(2000);
        Home.getname().getText().then(function(text){
            console.log("your name is" + text)
        });
    };

}




//
// var HomePage = function(){
//
//
//     this.loginAsCustomer = function(){
//         //
//         // if(Generic.VerifyWebelement(element(by.partialButtonText("Customer")))){
//         //
//         //     element(by.partialButtonText("Customer")).click();
//         // }else {
//         //     console.log("loginAscustomerbutton is Not displayed");
//         // }
//
//         element(by.partialButtonText("Customer")).click();
//
//     };
//
//     this.loginAsBankManager = function(){
//
//         element(by.ngClick("manager()")).click();
//
//         // if(Generic.VerifyWebelement( element(by.ngClick("manager()")))){
//         //
//         //     element(by.ngClick("manager()")).click();
//         // } else {
//         //     console.log("loginAsBankManager button is Not displayed");
//         // }
//
//         // return require('../AddCustomerDetails.js');
//
//     };
//
// };
// module.exports = new HomePage();
