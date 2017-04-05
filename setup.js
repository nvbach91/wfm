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

casper.record = function () {
    if (config.recordVideo) {
        casper.capture(config.screenshotFilePath + 'record' + config.screenshotFileExtension);
    }
};


require('./steps/login');
require('./steps/goToFoodCampaignsTab');
require('./steps/selectCountry').select(config.countryId);