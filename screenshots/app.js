var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    },{}); // enable customisation of search settings on first page hit

    var initialColumnSettings=undefined; // enable customisation of visible columns on first page hit
    if(initialColumnSettings) {
        if(initialColumnSettings.displayTime !==undefined) {
            this.displayTime=!initialColumnSettings.displayTime; // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
        }
        if(initialColumnSettings.displayBrowser !==undefined) {
            this.displayBrowser=!initialColumnSettings.displayBrowser; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots=initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9008,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 3 to equal 4.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\spec.js:9:30)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "images\\008800ea-00cc-0089-0008-0020003f00b7.png",
        "timestamp": 1534237598140,
        "duration": 7803
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9576,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 3 to equal 4.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\spec.js:9:30)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "images\\00c50042-00cb-009e-00a4-00dc00470037.png",
        "timestamp": 1534238742574,
        "duration": 6621
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 3 to equal 4.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\spec.js:9:30)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "images\\00bf00cd-007b-0065-0061-00d500cb0087.png",
        "timestamp": 1534240031476,
        "duration": 7347
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10808,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected 3 to equal 4.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\spec.js:9:30)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "images\\00500099-001a-0050-0073-008a00ae00f4.png",
        "timestamp": 1534240127040,
        "duration": 7921
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3788,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534240181897,
        "duration": 6580
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10480,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534240229083,
        "duration": 6427
    },
    {
        "description": "Date picker Dropdown|Dalelotts date time picker",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dalelotts.github.io/angular-bootstrap-datetimepicker/ 561 Mixed Content: The page at 'https://dalelotts.github.io/angular-bootstrap-datetimepicker/' was loaded over HTTPS, but requested an insecure image 'http://img.shields.io/badge/license-MIT-blue.svg?style=flat'. This content should also be served over HTTPS.",
                "timestamp": 1534403026147,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0054004a-00aa-0022-0098-00b300860084.png",
        "timestamp": 1534403023747,
        "duration": 15977
    },
    {
        "description": "Date picker Link|Dalelotts date time picker",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dalelotts.github.io/angular-bootstrap-datetimepicker/ 561 Mixed Content: The page at 'https://dalelotts.github.io/angular-bootstrap-datetimepicker/' was loaded over HTTPS, but requested an insecure image 'http://img.shields.io/badge/license-MIT-blue.svg?style=flat'. This content should also be served over HTTPS.",
                "timestamp": 1534403040232,
                "type": ""
            }
        ],
        "screenShotFile": "images\\002a0039-0097-0089-0088-00a900b900c4.png",
        "timestamp": 1534403040183,
        "duration": 11539
    },
    {
        "description": "Date picker embedded|Dalelotts date time picker",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13384,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load",
        "trace": "Error: Angular could not be found on the page https://dalelotts.github.io/angular-bootstrap-datetimepicker/. If this is not an Angular application, you may need to turn off waiting for Angular.\n                          Please see \n                          https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load\n    at executeAsyncScript_.then (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:720:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:4:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Datepicker.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dalelotts.github.io/angular-bootstrap-datetimepicker/ 561 Mixed Content: The page at 'https://dalelotts.github.io/angular-bootstrap-datetimepicker/' was loaded over HTTPS, but requested an insecure image 'http://img.shields.io/badge/license-MIT-blue.svg?style=flat'. This content should also be served over HTTPS.",
                "timestamp": 1534403052103,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e800b1-00d5-00fb-00d5-0061003f000d.png",
        "timestamp": 1534403052043,
        "duration": 11627
    },
    {
        "description": "Yes its date check|Going to test the date in javascript",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12644,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: cosole is not defined",
        "trace": "ReferenceError: cosole is not defined\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:21:9)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Yes its date check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:5:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "images\\008200f6-00bc-00a5-0082-00b000e400da.png",
        "timestamp": 1534404117604,
        "duration": 4
    },
    {
        "description": "Yes its date check|Going to test the date in javascript",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "24e8613f877dbd33ea5d7ed8db0cb5e2",
        "instanceId": 13892,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: cosole is not defined",
        "trace": "ReferenceError: cosole is not defined\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:21:9)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Yes its date check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:5:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "images\\006200dc-0051-0077-006b-008c00bf0091.png",
        "timestamp": 1534404202233,
        "duration": 4
    },
    {
        "description": "Yes its date check|Going to test the date in javascript",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3936,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: cosole is not defined",
        "trace": "ReferenceError: cosole is not defined\n    at UserContext.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:21:9)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Yes its date check\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:5:5)\n    at addSpecsToSuite (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\ranbadan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\nalpasav\\Protractor\\Misc.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "images\\00580022-003c-0097-0070-0095002c00ae.png",
        "timestamp": 1534404312134,
        "duration": 4
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6848,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534404355994,
        "duration": 7357
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13688,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534404887371,
        "duration": 6068
    },
    {
        "description": "Date function is testing |angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13688,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1534404893476,
        "duration": 1
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12912,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534406970380,
        "duration": 6988
    },
    {
        "description": "Date function is testing |angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12912,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1534406977408,
        "duration": 1
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13036,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1534407429677,
        "duration": 7384
    },
    {
        "description": "Date function is testing |angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13036,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1534407437101,
        "duration": 12
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
                if (a.instanceId < b.instanceId) return -1;
                else if (a.instanceId > b.instanceId) return 1;

                if (a.timestamp < b.timestamp) return -1;
                else if (a.timestamp > b.timestamp) return 1;

                return 0;
            });
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};