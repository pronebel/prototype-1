exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  chromeDriver: './selenium/chromedriver',

  capabilities: {
    'browserName': 'firefox'
  },

  specs: [
    './public/test/e2e/**/*Spec.js'
  ],

  jasmineNodeOpts: {
    showColors: true
  }
};