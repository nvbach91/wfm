/**
 * Tests for the seasonal checkboxes
 * only editable for not signed-off advertising dates
 */
var verify = function () {
    casper.test.begin('Testing campaign maintenance edit advertising date seasonal items', function suite(test) {
        var itemChecboxCSS = '.wfm-fc-campaign-items-panel-seasonal-item-col input';
        var uncheckedSeasonalTopCheckboxCSS = '.uncheckedImageCheckBox';
        var checkedSeasonalTopCheckboxCSS = '.checkedImageCheckBox';
        var checkedSeasonalTopCheckboxWithGrayBgCSS = '.checkedImageCheckBoxWithGreyBackground';

        var isSignedOffAdvertisingDate = casper.exists('.wfm-link-button-disabled'); 
        
        var itemRowCSS = '.wfm-fc-campaign-items-panel-item-row';
        var nItems = casper.evaluate(function (itemRowCSS) {
            return jQuery(itemRowCSS).size();
        }, itemRowCSS);

        casper.thenLog('Opening edit mode');
        casper.thenClick('.wfm-link-edit');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        if (!nItems) {
            casper.thenLog('The selected Advertising date does not contain any advertising item', 'WARN_BAR');
            casper.warnNoDataToTest();
        } else if (isSignedOffAdvertisingDate) {
            casper.thenLog('The selected Advertising date is signed off so seasonal can\'t be edited', 'WARN_BAR');
            //casper.warnNoDataToTest();
            casper.thenClick(uncheckedSeasonalTopCheckboxCSS);
            casper.thenAssertDoesntExist(test, checkedSeasonalTopCheckboxCSS, 'The seasonal checkbox is disabled and cannot be clicked');
            casper.thenAssertEval(test, function (itemChecboxCSS) {
                return jQuery(itemChecboxCSS).is(':disabled');
            }, 'All seasonal checkboxes are disabled and cannot be clicked', itemChecboxCSS);
            casper.thenLiveCapture();
        } else {
            casper.thenLog('There are ' + nItems + ' items in this AD', 'PARAMETER');
            var randomItemCSS = itemRowCSS + ':nth-child(1)';
            var checkedCSS = ':checked';
            var notCheckedCSS = ':not(:checked)';
            var isCheckedFirstItemSeasonal = casper.exists(randomItemCSS + ' ' + itemChecboxCSS + checkedCSS);
            var originalCheckState = isCheckedFirstItemSeasonal ? checkedCSS : notCheckedCSS;
            var currentCheckState = isCheckedFirstItemSeasonal ? notCheckedCSS : checkedCSS;

            // if the first item is seasonal then the top checkbox is also checked but wich graybackground and a different selector
            casper.thenLog('Clicking the top seasonal checkbox');
            casper.thenClick(isCheckedFirstItemSeasonal ? checkedSeasonalTopCheckboxWithGrayBgCSS : uncheckedSeasonalTopCheckboxCSS);
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertExists(test, isCheckedFirstItemSeasonal ? uncheckedSeasonalTopCheckboxCSS : checkedSeasonalTopCheckboxCSS, 
                'The top seasonal checkbox is checkable');
            casper.thenLog('Clicking the first item\'s seasonal checkbox');
            // casper will click once on the first matched element checkbox
            casper.thenClick(itemChecboxCSS);
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertExists(test, randomItemCSS + ' ' + itemChecboxCSS + currentCheckState, 
                'The first seasonal checkbox was ' + originalCheckState + ' in edit mode and is now ' + currentCheckState);

            // canceling edit
            casper.thenLog('Clicking cancel edit');
            casper.thenClick('a.wfm-link-cancel');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertExists(test, randomItemCSS + ' ' + itemChecboxCSS + originalCheckState, 
                'The first seasonal checkbox in view mode was ' + originalCheckState + ' and now is ' + originalCheckState);
            
            // reopen edit and confirm seasonal item check on the first item
            casper.thenLog('Opening edit mode again');
            casper.thenClick('.wfm-link-edit');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenClick(itemChecboxCSS);
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenClick('a.wfm-link-save');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertExists(test, randomItemCSS + ' ' + itemChecboxCSS + currentCheckState, 
                'The first seasonal checkbox in edit mode was ' + originalCheckState + ' and now is ' + currentCheckState);

        }
        casper.run(function () {
            test.done();
            casper.echo('');
        });
    });
};

exports.verify = verify;