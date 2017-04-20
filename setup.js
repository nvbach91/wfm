/**
 * casperjs setups
 */
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36');

casper.start(config.baseUrl, function () {
    casper.viewport(1920, 1080);
    casper.zoom(0.8);
});

casper.mlog = function (msg) { 
    casper.echo('[' + new Date().toISOString().slice(11, -1) + '] ' + msg, 'INFO'); 
};

casper.thenLog = function (msg) {
    casper.then(function () {
        casper.mlog(msg);
    });
};

casper.liveCapture = function () {
    if (config.liveCapture) {
        casper.capture(config.screenshotFilePath + 'live' + config.screenshotFileExtension);
    }
};

casper.thenLiveCapture = function () {
    casper.then(function () {
        casper.liveCapture();
    });
};

casper.thenClickLabel = function (label, tag) {
    casper.then(function () {
        casper.clickLabel(label, tag);
    });
};

casper.warnNoDataToTest = function () {
    casper.then(function () {
        casper.echo(
        '/////////////////////////////// NO DATA TO TEST ////////////////////////////////'
        , 'WARN_BAR');
    });
};

casper.thenAssertEval = function (test, eval, msg, args) {
    casper.then(function () {
        test.assertEval(eval, msg, args);
    });
};

casper.thenAssertExists = function (test, selector, msg) {
    casper.then(function () {
        test.assertExists(selector, msg);
    });
};

casper.thenAssertDoesntExist = function (test, selector, msg) {
    casper.then(function () {
        test.assertDoesntExist(selector, msg);
    });
};

casper.randomIntBetween = function (min, max) {
    return Math.floor(Math.random() * max) + min; 
};

casper.thenSendKeys = function (css, string, options) {
    casper.then(function () {
        casper.sendKeys(css, string, options);
    });
};

require('./steps/login');
require('./steps/goToFoodCampaignsTab');
require('./steps/selectCountry').select(config.countryId);