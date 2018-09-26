var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var notify = require("gulp-notify");
var webdriver_update = require('gulp-protractor').webdriver_update;
var webdriver_start = require('gulp-protractor').webdriver_standalone;


gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_start', webdriver_start);


gulp.task('dome', function () {


    gulp.src(["../test_spec/BankManagerLoginTest_spec.js"])
        .pipe(notify("Change Found , Executing Scripts."))
        .pipe(protractor({

            configFile: "conf.js",
           // args: ['--baseUrl', 'http://127.0.0.1:8000']
         //   args: ['--baseUrl', 'http://127.0.0.1:8000']


        })).on('error', function (e) {
        throw e
    });
})


gulp.task('default', function () {


    // gulp.watch('./webpages/*.js', ['dome']);
    gulp.watch('../test_spec/BankManagerLoginTest_spec.js', ['dome']);
    gulp.watch('Conf.js', ['dome']);
});
