

module.exports = class webelementutil {

    Webelementreturn(ele) {
        var locator = ele.split(":");
        var locatorname =  locator[0];
        var locatorvalue = locator[1];
        var finalval = locatorname + "\(\"" + locatorvalue + "\"\)" ;
        console.log(finalval);

        if( locatorname == "xpath" ){
            return  element(by.xpath(locatorvalue));
        }
        if( locatorname == "id" ){
            return  element(by.id(locatorvalue));
        }
        else if( locatorname == "css" ){
            return  element(by.css(locatorvalue));
        }
        else if( locatorname == "linkText" ){
            return  element(by.linkText(locatorvalue));
        }
        else if( locatorname == "partialLinkText" ){
            return  element(by.partialLinkText(locatorvalue));
        }
        else if( locatorname == "bindig" ){
            return  element(by.binding(locatorvalue));
        }
        else if( locatorname == "exactBinding" ){
            return  element(by.exactBinding(locatorvalue));
        }
        else if( locatorname == "repeater" ){
            return  element(by.repeater(locatorvalue));
        }
        else if( locatorname == "exactRepeater" ){
            return  element(by.exactRepeater(locatorvalue));
        }
        else if( locatorname == "partialButtonText" ){
            return  element(by.partialButtonText(locatorvalue));
        }
        else if( locatorname == "buttonText" ){
            return  element(by.buttonText(locatorvalue));
        }
        else if( locatorname == "class" ){
                return  element(by.className(locatorvalue));
        }
        if( locatorname == "model" ){
            return  element(by.model(locatorvalue));
        }
        else{
            console.log("Please check the locator type or locator value")
        }
    }

    // verifywebelementexist = function (element) {
    //     return element.isDisplayed();
    //     // expect(element.isDisplayed()).toBe(true);
    // }
    // gettext= function (element) {
    //     return element.isDisplayed();
    //     // expect(element.isDisplayed()).toBe(true);
    // }
    //
    // hasClass = function (element, cls) {
    //     return element.getAttribute('class').then(function (classes) {
    //         return classes.split(' ').indexOf(cls) !== -1;
    //         // expect(hasClass(element(by.name('getoffer')), 'ngDirty')).toBe(true);
    //     });
    // };



}
// element(by.buttonText("Bank Manager Login")).click();
// browser.sleep(8000);
// " \"ROM\" "
//  element(by.finalval).getWebElement().click();