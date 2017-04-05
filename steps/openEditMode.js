/**
 * Click on the edit button and await popup
 */
casper.test.begin('Open edit mode', function suite(test) {
    casper.then(function () {
        
casper.mlog('Opening edit mode');
        casper.click('.wfm-link-edit');
        casper.waitWhileVisible('.wfm-global-ajax-indicator');
    }).run(function () {
        test.done();
        casper.echo('');
    });
});