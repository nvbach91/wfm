/* global require */

var config = require('./config');
var utils = {
    log: function (msg) {
        casper.echo('[' + new Date().toISOString().slice(11, -1) + '] ' + msg);
    }
};

/*var casper = require('casper').create({
    pageSettings: {
        //loadImages: false,
        //loadPlugins: false
    }
});*/

casper.test.begin('Login to Food Campaign and change country to FJ', function suite(test) {

    casper.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36");

    casper.start(config.baseUrl, function () {
        casper.viewport(1920, 1080);
        casper.zoom(0.8);
        test.assertTitleMatches(/allocation/i);
    });

    // login
    casper.then(function () {
        utils.log('Logging in');

        var loginInputSelector = 'input[name="_58_login"]';
        var passwordInputSelector = 'input[name="_58_password"]';
        var loginButtonSelector = 'input[name="btn_login"]';

        test.assertElementCount(loginInputSelector, 1);
        test.assertElementCount(passwordInputSelector, 1);
        test.assertElementCount(loginButtonSelector, 1);

        casper.sendKeys(loginInputSelector, config.username);
        casper.sendKeys(passwordInputSelector, config.password);
        casper.click(loginButtonSelector);

        casper.waitForSelector('#main-content');
    });

    // go to food campaigns
    casper.then(function () {
        utils.log('Going to Food Campaigns page');
        casper.click('#wfm-portal-menu a[href="/web/guest/ldfc"]');
        casper.waitForSelector('select[name="country-division-selection"]');
    });

    // select country
    casper.then(function () {
        utils.log('Selecting country');
        casper.evaluate(function (cId) {
            jQuery('select[name="country-division-selection"]').val(cId).parent().submit();
        }, config.countryId);
        casper.waitForSelector('select[name="country-division-selection"] option[selected][value="' + config.countryId + '"]');
    });

    casper.then(function () {
        casper.capture('screenshot.png');
    });

    casper.run(function () {
        test.done();
    });
});