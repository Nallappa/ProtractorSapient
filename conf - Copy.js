
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');

exports.config = {
    directConnect: true,
    //     // Capabilities to be passed to the webdriver instance.
        multiCapabilities: [{
            browserName: 'chrome'
        }],
    framework: 'jasmine2',
    //specs: ['spec.js'],
    //specs: ['Datepicker.js'],
    specs: ['spec.js'],
    /*suites: {

            smoke: ['./smoke/!*.spec.js'],
            regression: ['./regression/!*.spec.js'],
            functional: ['./functional/!*.spec.js'],
            all: ['./!*!/!*.spec.js'],
            selected: ['./functional/addcustomer.spec.js','./regression/openaccount.spec.js'],


    },*/

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'screenshots'
            ,screenshotsSubfolder: 'images'
            , jsonsSubfolder: 'jsons'
            , excludeSkippedSpecs: true
            , takeScreenShotsForSkippedSpecs: true
            , takeScreenShotsOnlyForFailedSpecs: true
            , docTitle: 'Reporting Part'
            , docName: 'Myreport.html'
            , gatherBrowserLogs: false
            ,consolidate: false
            ,consolidateAll: false
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

//http://www.tutorialsteacher.com/javascript/closure-in-javascript Closure good Explanation.
//https://engineering.wingify.com/posts/angularapp-e2e-testing-with-protractor/ Basics explanation
//npm install --save protractor-utility-for-dalelotts-angular-date-time-picker