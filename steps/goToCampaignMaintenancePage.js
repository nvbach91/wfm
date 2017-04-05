/**
 * Navigate to Campaign Maintenance Page
 */
casper.test.begin('Navigate to Campaign Maintenance Page', function suite(test) {
    // going to Campaign Maintenance
    casper.then(function () {
        
casper.mlog('Going to Campaing Maintenance');
        casper.clickLabel('Campaign Maintenance', 'a');
        casper.waitForSelector('ul.wfm-menu-list li.wfm-menu-active div span em');
    }).run(function () {
        test.done();
        casper.echo('');
    });
});