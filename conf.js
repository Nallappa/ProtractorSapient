

/**
 * Created by Nalli on 27-08-2018.
 */

var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');

exports.config = {
    //directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub/',
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        browserName: 'chrome'
    }],
    // multiCapabilities: [{
    //     browserName: 'firefox'
    //     shardTestFiles: true,
    //     maxInstances: 2
    // }, {
    //     browserName: 'chrome'
    // }],
    framework: 'jasmine2',
    specs: ['./spec.js'],
   // specs: ['./test_spec/AddCustomerinfospec.js'],
    // specs: ['./test_spec/AddCustomerInfoTest_spec.js'],
    // specs: ['./test_spec/BankManagerLoginTest_spec.js'],

    suites: {
            smoke: ['./smoke/!*.spec.js'],
            regression: ['./regression/!*.spec.js'],
            functional: ['./functional/!*.spec.js'],
            all: ['./!*!/!*.spec.js'],
            selected: ['./functional/addcustomer.spec.js','./regression/openaccount.spec.js'],
        //    protractor protractor.conf.js --suite smoke //to run specific file
    },

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true,
        isVerbose: true,
        includeStackTrace: true
    },

    params: {
        login: {
            user: 'protractor-br',
            password: '#ng123#'
        }
    },

    onPrepare: function() {
        global.isAngularSite = function(flag) {
            browser.ignoreSynchronization = !flag;
        };
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        global.dvr = browser.driver; //Use for non angular js applications
        // browser.driver.manage().window().setSize(1600, 800); //Set the window size
        browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'screenshots'
            , preserveDirectory: false
            // , cssOverrideFile: 'css/style.css'
            ,screenshotsSubfolder: 'images'
            , jsonsSubfolder: 'jsons'
            , excludeSkippedSpecs: true
            , takeScreenShotsForSkippedSpecs: false
            , takeScreenShotsOnlyForFailedSpecs: false
            , docTitle: 'Reporting Part'
            , docName: 'Myreport.html'
            // , searchSettings:{
            //     allselected: false,
            //     passed: true,
            //     failed: true,
            //     pending: true,
            //     withLog: true
            // }
            // , columnSettings:{
            //     displayTime:true,
            //     displayBrowser:true,
            //     displaySessionId:true,
            //     inlineScreenshots:true
            // }
            , gatherBrowserLogs: false
            , sortFunction: function sortFunction(a, b) {
                if (a.instanceId < b.instanceId) return -1;
                else if (a.instanceId > b.instanceId) return 1;

                if (a.timestamp < b.timestamp) return -1;
                else if (a.timestamp > b.timestamp) return 1;

                return 0;
            }
            // , pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
            //     // Return '<browser>/<specname>' as path for screenshots:
            //     // Example: 'firefox/list-should work'.
            //     return path.join(capabilities.caps_.browser, descriptions.join('-'));
            // }
        }).getJasmine2Reporter());
    }



}