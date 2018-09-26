/**
 * Created by Nalli on 27-08-2018.
 */

module.exports = class selectwrapper {

 selectbytext(selector,text){
     element(selector).all(by.xpath('option[.="' + text + '"]')).click()
 }

    selectbypartialtext(selector,text){
        element(selector).all(by.cssContainingText('option', text)).click()
    }

    selectbyvalue(selector,value){
        element(selector).all(by.css('option[value="' + value + '"]')).click();
    }

}

//
// var SelectWrapper = function(selector) {
//     this.webElement = element(selector);
// };
// SelectWrapper.prototype.getOptions = function() {
//     return this.webElement.all(by.tagName('option'));
// };
// SelectWrapper.prototype.getSelectedOptions = function() {
//     return this.webElement.all(by.css('option[selected="selected"]'));
// };
// SelectWrapper.prototype.selectByValue = function(value) {
//     return this.webElement.all(by.css('option[value="' + value + '"]')).click();
// };
// SelectWrapper.prototype.selectByPartialText = function(text) {
//     return this.webElement.all(by.cssContainingText('option', text)).click();
// };
// SelectWrapper.prototype.selectByText = function(text) {
//     return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
// };