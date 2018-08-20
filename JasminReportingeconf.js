
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');


exports.config = {
    directConnect: true,
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        browserName: 'chrome'
    }],
    framework: 'jasmine2',
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
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'target/screenshots'
                ,screenshotsFolder: 'images'
                ,inlineImages: true
                ,takeScreenshots: false
                ,takeScreenshotsOnlyOnFailures: true
                ,fileNamePrefix: 'Prefix'
                ,consolidate: false
                ,consolidateAll: false
                ,cleanDestination: false
                ,showPassed: false
                ,fileName: 'MyReportName'
                ,fileNameSeparator: '_'
                ,fileNamePrefix: ''
                ,fileNameSuffix: ''
                ,fileNameDateSuffix: true
            })
        );
    }



}