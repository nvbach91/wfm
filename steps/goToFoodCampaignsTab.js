/**
 * Navigate to Food Campaigns Tab
 */
casper.test.begin('Navigate to Food Campaigns Tab', function suite(test) {
    // going to food campaigns
    casper.then(function () {
        casper.mlog('Going to Food Campaigns page');
        casper.click('#wfm-portal-menu a[href="' + config.foodCampaignTabPath + '"]');
        casper.waitForSelector('select[name="country-division-selection"]').thenLiveCapture();
    }).run(function () {
        test.done();
        casper.echo('');
    });
});