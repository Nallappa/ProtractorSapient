


module.exports = class windowhandleutil {

    Getwindowhandles = function(){
        var handlePromise = browser.driver.getAllWindowHandles();
        handlePromise.then(function (handles) {
            var  parentHandle = handles[0];
            var popUpHandle = handles[1];
            // Change to new handle
            browser.driver.switchTo().window(popUpHandle);
        });
    }
}
