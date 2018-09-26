module.exports = class alerthandleutil {


    OpenNewBrowser = function(url){
        var newBrowser = browser.forkNewDriverInstance();
        //Opens a URL in the 2nd browser instance
        newBrowser.get(url);
        // return newBrowser.driver.quit();
    }

}