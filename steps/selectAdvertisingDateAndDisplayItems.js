/**
 * Select and search for items in an Advertising Date
 */
var searchAllAdvertisingDateItems = function (advertisingDateDesc) {
    casper.test.begin('Selecting Advertising Date', function suite(test) {
        casper.then(function () {
            casper.mlog('Selecting Advertising Date and search for items in it');
            casper.evaluate(function (advertisingDateDesc) {
                var advertisingDateSelect = jQuery('#campaign_items_filter select[name="advertising-date-select"]');
                var adVal = advertisingDateSelect.find('option:contains("' + advertisingDateDesc + '")').attr('value');
                advertisingDateSelect.val(adVal);

                // simulate selecting the options dropdown
                //var select = document.querySelector('#campaign_items_filter select[name="advertising-date-select"]');
                var evt = document.createEvent('UIEvents'); // or "HTMLEvents"
                evt.initUIEvent('change', true, true);
                advertisingDateSelect[0].dispatchEvent(evt);

            }, advertisingDateDesc);
            //casper.thenLiveCapture();
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenClickLabel('Search', 'span');
            //casper.waitForSelector('.wfm-fc-campaign-items-panel-item-row');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
        });
        
        casper.run(function () {
            test.done();
            casper.echo('');
        });
    });
};

exports.searchAllAdvertisingDateItems = searchAllAdvertisingDateItems;