var dtPicker = require('protractor-utility-for-dalelotts-angular-date-time-picker');

describe('Dalelotts date time picker', function () {
    beforeEach(function () {
        browser.get('https://dalelotts.github.io/angular-bootstrap-datetimepicker/');
    });

    it('Date picker Dropdown', function () {
        var parent = '//*[@id="drop-down-input"]/div/div[1]/div/div';
        dtPicker(parent, '2040/07/27 22:00');
        var div1 = element(by.xpath('//*[@id="dropdown2"]/div/input'));
        div1.getAttribute('value').then(function (value) {
            console.log(value);
            expect(value).toBe('Fri Jul 27 2040 22:00:00 GMT+0530 (India Standard Time)');
        });
    });

    it('Date picker Link', function () {
        var parent = '//*[@id="drop-down"]/div/div[1]/div/div';
        var triggerElement = '//*[@id="dropdown1"]';
        dtPicker(parent, '1970/07/27 22:00', triggerElement);
    });

    it('Date picker embedded', function () {
        var parent = '//*[@id="inline"]/div[2]/div[1]/div/div';
        dtPicker(parent, '2070/07/27 22:00');
        console.log("Am making the change");
        Login form
    });
});