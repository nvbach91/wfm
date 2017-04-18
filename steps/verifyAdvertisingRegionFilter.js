/**
 * Checks initial value of the adverising dates filter
 * Checks the list items order*
 * Verifies regional filter results
 * !!! does not cover creating new items for the AD and verify it it the filter result
 */
casper.test.begin('Advertising dates region filters', function suite(test) {

    // open combo box for additional filter conditions of NAT and REG filters
    var openCombobox = function () {
        casper.thenClick('.wfm-multiselectchoice-status-bar');
        casper.waitUntilVisible('.wfm-multiselectchoice-inner.wfm-multiselectchoice-expanded');
        casper.wait(config.domManipulationTime);
        casper.thenLiveCapture();
    };

    // verify there are filter options to choose from
    casper.thenAssertEval(test, function () {
        var advertisingRegionFilter = jQuery('.advertising-region-filter');
        var radioButtons = advertisingRegionFilter.find('.advertising-region-selection-class-radio-choice').children('input');
        if (radioButtons.size() !== 3) {
            __utils__.echo(radioButtons.size());
            return false;
        }
        if (!radioButtons.eq(0).is(':checked')) {
            __utils__.echo(radioButtons.eq(0).is(':checked'));
            return false;
        }
        var radioButtonValues = {
            ALL: true,
            NAT: true,
            REG: true
        };
        for (var i = 0; i < radioButtons.size(); i++) {
            var radioButtonValue = radioButtons.eq(i).attr('value');
            if (!radioButtonValues[radioButtonValue]) {
                __utils__.echo(radioButtonValue);
                return false;
            }
        }
        return true;
    }, 'There are 3 Advertising region radio buttons with valid names in the filter and initially the first radio button is checked');

    // testing NAT region filter + combobox
    casper.thenClick('.advertising-region-filter input[value="NAT"]');
    casper.waitForSelector(".advertising-region-filter.advertising-region-selection-class-nat");
    casper.thenClickLabel('Search', 'span');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    // check initial "and also in" options are not selected
    casper.thenAssertEval(test, function () {
        var options = jQuery('.wfm-multiselectchoice-data-options input');
        for (var i = 0; i < options.size(); i++) {
            if (options.eq(i).is(':checked')) {
                return false;
            }
        }
        return true;
    }, 'NAT filter is selected and all the NAT selection options are not selected');
    // check if displayed results are NAT items
    casper.thenAssertEval(test, function () {
        var items = jQuery('.wfm-fc-campaign-items-panel-item-row');
        for (var i = 0; i < items.size(); i++) {
            if (items.eq(i).find('.wfm-fc-campaign-items-panel-advertising-region-description-col').text() !== 'NAT') {
                return false;
            }
        }
        return true;
    }, 'NAT filter is applied and all items displayed are NAT items');

    // open the combo box for "and also in"
    openCombobox();
    
    // fetch the number of options in the combo box
    var nAvailableRegions = 0;
    casper.then(function () {
        nAvailableRegions = casper.evaluate(function () {
            return jQuery('ul.wfm-multiselectchoice-data-options li').size();
        });
        casper.echo('Number of available regions select options: ' + nAvailableRegions);
    });
    
    casper.then(function () {
        // if there are available regions to choose from
        // change chosen region back to selected and aply filter
        if (!nAvailableRegions) {
            casper.warnNoDataToTest();
            return;
        }

        var nthOptionToSelect = casper.randomIntBetween(1, nAvailableRegions);
        var chosenOptionSelector = 'ul.wfm-multiselectchoice-data-options li:nth-child(' + nthOptionToSelect + ')';
        var chosenCheckBoxSelector = chosenOptionSelector + ' input[type="checkbox"]';
        var selectedRegionDescription = casper.fetchText(chosenOptionSelector + ' label').trim();
        casper.echo('Randomly choosing option ' + nthOptionToSelect + ' (' + selectedRegionDescription + ')', 'PARAMETER');

        casper.thenClick(chosenCheckBoxSelector);
        casper.thenLiveCapture();
        casper.thenClickLabel('Search', 'span');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.thenAssertEval(test, function (srd) {
            var items = jQuery('.wfm-fc-campaign-items-panel-item-row');
            for (var i = 0; i < items.size(); i++) {
                var itemDescription = items.eq(i).find('.wfm-fc-campaign-items-panel-advertising-region-description-col').text();
                if (itemDescription !== 'NAT' && itemDescription !== srd) {
                    return false;
                }
            }
            return true;
        }, 'All displayed items match the NAT filter condition with "and also in" = "' + selectedRegionDescription + '" selected', selectedRegionDescription);
        // change chosen region back to not selected and aply filter
        // open the combo box for "and also in"
        openCombobox();

        casper.thenClick(chosenCheckBoxSelector);
        casper.thenLiveCapture();
        casper.thenClickLabel('Search', 'span');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.thenAssertEval(test, function () {
            var items = jQuery('.wfm-fc-campaign-items-panel-item-row');
            for (var i = 0; i < items.size(); i++) {
                var itemDescription = items.eq(i).find('.wfm-fc-campaign-items-panel-advertising-region-description-col').text();
                if (itemDescription !== 'NAT') {
                    return false;
                }
            }
            return true;
        }, 'After deselecting the also in conditions, all displayed items are NAT region only');

    });

    // ================================================================================

    // testing REG filter + combobox
    casper.thenClick('.advertising-region-filter input[value="REG"]');
    casper.waitForSelector('.advertising-region-filter.advertising-region-selection-class-reg');
    
    // open combo box "but only in"
    openCombobox();

    // check if the initial settings for "but only in" is set to that all regions are selected
    casper.thenAssertEval(test, function () {
        var options = jQuery('.wfm-multiselectchoice-data-options input');
        for (var i = 0; i < options.size(); i++) {
            if (!options.eq(i).is(':checked')) {
                return false;
            }
        }
        if (!jQuery('.wfm-multiselectchoice-meta-options input').is(':checked')) {
            return false;
        }
        return true;
    }, 'REG filter is selected and all the "but only in" selection options are selected along with the All option');
    // apply REG filter with "but only in" all regions
    casper.thenClickLabel('Search', 'span');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, function () {
        var items = jQuery('.wfm-fc-campaign-items-panel-item-row');
        for (var i = 0; i < items.size(); i++) {
            var itemDescription = items.eq(i).find('.wfm-fc-campaign-items-panel-advertising-region-description-col').text();
            if (itemDescription === 'NAT') {
                return false;
            }
        }
        return true;
    }, 'REG filter is applied with all "but only in" options. The results contains only items which are not NAT');

    casper.then(function () {
    // unselect one random region and apply
        var nthOptionToSelect = casper.randomIntBetween(1, nAvailableRegions);
        var chosenOptionSelector = 'ul.wfm-multiselectchoice-data-options li:nth-child(' + nthOptionToSelect + ')';
        var chosenCheckBoxSelector = chosenOptionSelector + ' input[type="checkbox"]';
        var unselectedRegionDescription = casper.fetchText(chosenOptionSelector + ' label').trim();
        casper.echo('Randomly unselect region option ' + nthOptionToSelect + ' (' + unselectedRegionDescription + ')', 'PARAMETER');

        openCombobox();

        casper.thenClick(chosenCheckBoxSelector);
        casper.wait(config.domManipulationTime);
        casper.thenLiveCapture();
        casper.thenAssertEval(test, function () {
            return !jQuery('.wfm-multiselectchoice-meta-options input').is(':checked');
        }, 'After deselecting one option in the "but only in" condition, the All option is also deselected');
        casper.thenClickLabel('Search', 'span');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.thenAssertEval(test, function (usrd) {
            var items = jQuery('.wfm-fc-campaign-items-panel-item-row');
            for (var i = 0; i < items.size(); i++) {
                var itemDescription = items.eq(i).find('.wfm-fc-campaign-items-panel-advertising-region-description-col').text();
                if (itemDescription === usrd) {
                    return false;
                }
            }
            return true;
        }, 'There are no items with region "' + unselectedRegionDescription + '" displayed', unselectedRegionDescription);
    });

    // open combo box
    openCombobox()

    // click on "All" option in the "but only in" combobox to select all
    casper.thenClick('.wfm-multiselectchoice-meta-options input');
    casper.wait(config.domManipulationTime);
    casper.thenLiveCapture();
    
    // open combo box "but only in"
    openCombobox()

    casper.thenAssertEval(test, function () {
        var options = jQuery('.wfm-multiselectchoice-data-options input');
        for (var i = 0; i < options.size(); i++) {
            if (!options.eq(i).is(':checked')) {
                return false;
            }
        }
        return true;
    }, 'After selecting the All option, all options below are also selected');
    
    // click on "All" option in the "but only in" combobox to deselect all
    casper.thenClick('.wfm-multiselectchoice-meta-options input');
    casper.wait(config.domManipulationTime);
    casper.thenLiveCapture();

    // open combo box "but only in"
    openCombobox()

    casper.thenAssertEval(test, function () {
        var options = jQuery('.wfm-multiselectchoice-data-options input');
        for (var i = 0; i < options.size(); i++) {
            if (options.eq(i).is(':checked')) {
                return false;
            }
        }
        return true;
    }, 'After deselecting the All option, all options below are also deselected');
    
    casper.thenClickLabel('Search', 'span');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, function () {
        return jQuery('.wfm-fc-campaign-items-panel-item-row').size() === 0;
    }, 'After deselecting all regions, there are no items displayed below');

    /*
        // testing ALL filter checkbox
        casper.thenClick('.advertising-region-filter input[value="ALL"]');
        casper.waitWhileVisible('.advertising-region-filter.advertising-region-selection-class-reg');
        casper.thenClickLabel('Search', 'span');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
    */
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});
