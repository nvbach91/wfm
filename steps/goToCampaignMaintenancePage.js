/**
 * Navigate to Campaign Maintenance Page
 */
casper.test.begin('Navigate to Campaign Maintenance Page', function suite(test) {
    // going to Campaign Maintenance
    casper.mlog('Going to Campaing Maintenance');
    casper.clickLabel('Campaign Maintenance', 'a');
    casper.waitForSelector('ul.wfm-menu-list li.wfm-menu-active div span em');
    casper.thenAssertEval(test, function () {
        return jQuery('.tab0.selected').text().trim().toLowerCase() === 'campaign items';
    }, 'Campaign Items tab is pre selected');
    
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});