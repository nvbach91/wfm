/**
 * Search for items using the provided search value and validate the results
 * @params searchValue - the value to type in the search input
 */
var search = function (searchValue) {
    casper.test.begin('Advertising item search', function suite(test) {
        casper.then(function () {
            // testing the exclamation mark tooltip next to the advertising item search button
            var exclamationMarkSelector = '.item-search img';
            var tooltipText = 'Searches advertising items by their number or description. If multiple words are given, finds all items that match at least one of the words (logical OR operation).';
            casper.mouse.move(exclamationMarkSelector);
            var tooltipSelector = 'div[id^="ui-tooltip-"][class*="ui-tooltip"]';
            //casper.wait(500, function () {
                test.assertVisible(tooltipSelector, 'Advertising items search tooltip is visible on mouse hover');
                test.assertSelectorHasText(tooltipSelector, tooltipText, 'Tooltip pop-up contains required text');
            //});

            var searchInputSelector = '.item-search input[name="item-search:advertising-item-search"]';

            // testing search clear button
            var searchInputClearButtonSelector = '#campaign_items_filter .clear-text-button';
            casper.sendKeys(searchInputSelector, searchValue, {reset: true});
            test.assertVisible(searchInputClearButtonSelector, 'Clear button is visible after typing a value in the search input');
            casper.sendKeys(searchInputSelector, '', {reset: true});
            test.assertNotVisible(searchInputClearButtonSelector, 'Clear button is hidden after clearing the search input');
            casper.sendKeys(searchInputSelector, searchValue, {reset: true});
            casper.click(searchInputClearButtonSelector);
            test.assertNotVisible(searchInputClearButtonSelector, 'Clear button is hidden after clicking it');
            test.assertEvalEquals(function (sis) {
                return jQuery(sis).val();
            }, '', 'Search input is empty after clicking the clear button', searchInputSelector);

            casper.sendKeys(searchInputSelector, searchValue, {reset: true});
            
            // testing search input for advertising item
            casper.clickLabel('Search', 'span');
            casper.waitWhileVisible('.wfm-global-ajax-indicator', function () {
                var eval = test.assertEval(function (sv) {
                    var resultRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
                    var regex = new RegExp(sv);
                    for (var i = 0; i < resultRows.size(); i++) {
                        var item = resultRows.eq(i);
                        var itemNumber = item.find('td').eq(0).text().trim();
                        var itemDesc = item.find('td').eq(1).text().trim();
                        //__utils__.echo(itemNumber);
                        //__utils__.echo(itemDesc);
                        if (!regex.test(itemNumber) && !regex.test(itemDesc)) {
                            return false;
                        }
                    }
                    return true;
                }, "Items numbers or descriptions match the specified value", searchValue);
            });
        }).run(function () {
            test.done();
            casper.echo('');
        });
    });
}

exports.search = search;
