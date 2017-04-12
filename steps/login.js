/**
 * Login at the provided address with the provided credentials
 */
casper.test.begin('WFM Login', function suite(test) {
    casper.then(function () {
        casper.liveCapture();
        test.assertTitleMatches(/allocation/i);

        casper.mlog('Logging in');
        var loginInputSelector = 'input[name="_58_login"]';
        var passwordInputSelector = 'input[name="_58_password"]';
        var loginButtonSelector = 'input[name="btn_login"]';

        /*test.assertElementCount(loginInputSelector, 1);
        test.assertElementCount(passwordInputSelector, 1);
        test.assertElementCount(loginButtonSelector, 1);*/

        casper.sendKeys(loginInputSelector, config.username);
        casper.sendKeys(passwordInputSelector, config.password);
        casper.liveCapture();
        casper.click(loginButtonSelector);

        casper.waitForSelector('#main-content').thenLiveCapture();
    }).run(function () {
        test.done();
        casper.echo('');
    });
});