/**
 * After showing advertising items in campaign maintenance, try to add new item,
 * this action should lead the user to the Master data Advertising items page with 
 * an edit window pre-opened
 */
casper.test.begin('Testing connection to add new item in master data', function suite(test) {
    // get the item numbers on the campaign maintenance page to compare with the advertising items page's content
    var itemsNumbersOnCampaignMaintenance = casper.evaluate(function () {
        var itemNumbers = '';
        jQuery('.wfm-fc-campaign-items-panel-item-row').each(function () {
            itemNumbers += jQuery(this).find('.wfm-fc-campaign-items-panel-item-number-col').text().trim() + '\n';
        });
        return itemNumbers.trim();
    });
    casper.then(function () {
        //if (!itemsNumbersOnCampaignMaintenance) {
        //    return casper.warnNoDataToTest();
        //}
        casper.echo('Item numbers of Campaign Maintenance:\n' + itemsNumbersOnCampaignMaintenance, 'PARAMETER');
        casper.click('.wfm-link-new');
        casper.waitForSelector('.advertising-items-edit');
        casper.thenLiveCapture();

        casper.thenAssertEval(test, function (previousItemNumbers) {
            var itemNumbersOnAdvertisingItemsPage = '';
            jQuery('.advertising-items-result td.wfm-col-width-item-number').each(function () {
                itemNumbersOnAdvertisingItemsPage += jQuery(this).text().trim() + '\n';
            });
            __utils__.echo('Item numbers of Advertising Items page:\n' + itemNumbersOnAdvertisingItemsPage.trim());
            // compare item numbers displayed on the maintenance page with the item numbers on the current page
            return itemNumbersOnAdvertisingItemsPage.trim().indexOf(previousItemNumbers) === 0;
        }, 'The items on Campaign Maintenance are itentical to the items on the Advertising Items page', itemsNumbersOnCampaignMaintenance);

        // click on cancel
        casper.thenClick('.wfm-dialog-button-bar .wfm-link-button:last-child a');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        // click on confirm cancel
        casper.thenClick('.wfm-confirm-or-cancel-buttons-container .wfm-link-button a[id$=_confirm]');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        
    });
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});