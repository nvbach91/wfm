/**
 * Click on the edit button and await popup
 */
casper.test.begin('Open edit mode', function suite(test) {
    casper.mlog('Opening edit mode');
    casper.click('.wfm-link-edit');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});