module.exports = {
    default: {
      format: ['progress-bar', 'json:report/cucumber_report.json'],
      require: ['steps/*.steps.js,features/*.feature'],
    }
  }