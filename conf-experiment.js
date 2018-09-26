
var SpecReporter  = require('jasmine-spec-reporter');
var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter-2');
var fs = require('fs-extra');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'spec.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    // directConnect: true,
    // baseUrl: 'http://localhost:4200/',
    seleniumAddress: 'http://localhost:4444/wd/hub/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        // require('ts-node').register({
        //     project: 'Reporting/tsconfig.e2e.json'
        // });
        //
        // fs.emptyDir('e2e/_report', (err) => {
        //     err && console.log(err); });

        var jasmineEnv = jasmine.getEnv();

        // var specReporter = new SpecReporter({ spec: { displayStacktrace: true } });

        var xmlReporter = new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './screenshots',
            filePrefix: 'exmlresults'
        });

        var screenshotReporter = {
            specDone: function (result) {
                if (result.status === 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        };

        // jasmineEnv.addReporter(specReporter);
        jasmineEnv.addReporter(xmlReporter);
        jasmineEnv.addReporter(screenshotReporter);
    },
    //HTMLReport called once tests are finished
    onComplete: function() {
        var browserName, browserVersion, platform;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var testConfig = {
                reportTitle: 'Protractor Test Report',
                outputPath: './screenshots/',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: '.',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            // new HTMLReport().from('screenshots/e2exmlresults.xml', testConfig);
        });
    }
};