


exports.config = {
  framework: 'jasmine',
  directConnect: true,
    //     // Capabilities to be passed to the webdriver instance.
        multiCapabilities: [{
            browserName: 'chrome'
        }],
  specs: ['spec.js','Misc.js']
}

