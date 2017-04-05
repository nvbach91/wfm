/**
 * Select and search for items in an Advertising Date
 */
casper.test.begin('Selecting Advertising Date', function suite(test) {
    casper.then(function () {
        
casper.mlog('Selecting Advertising Date and search for items in it');
        casper.evaluate(function (config) {
            var advertisingDateSelect = jQuery('#campaign_items_filter select[name="advertising-date-select"]');
            var adVal = advertisingDateSelect.find('option:contains("' + config.exampleAdvertisingDateDesc + '")').attr('value');
            advertisingDateSelect.val(adVal);
        }, config);
        casper.clickLabel('Search', 'span');
        //casper.waitForSelector('.wfm-fc-campaign-items-panel-item-row');
        casper.waitWhileVisible('.wfm-global-ajax-indicator');
    }).run(function () {
        test.done();
        casper.echo('');
    });
});