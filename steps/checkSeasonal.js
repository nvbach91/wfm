/**
 * In edit mode click on seasonal items checkbox filter and validate that item rows are hidden / shown
 * only works individually (no other filters are applied)
 */
casper.test.begin('Testing seasonal items filter in edit mode', function suite(test) {
    var seasonalCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:seasonal-item-toggle"]';

    var checkItemRowsVisibility = function (scbs) {
        var isCheckedSeasonalFilter = jQuery(scbs).is(':checked');
        __utils__.echo('Checked: ' + isCheckedSeasonalFilter);
        var itemRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
        for (var i = 0; i < itemRows.size(); i++) {
            var itemRow = itemRows.eq(i);
            var isSeasonal = itemRow.find('.wfm-fc-campaign-items-panel-seasonal-item-col input').is(':checked');
            if (isCheckedSeasonalFilter) {
                if (!isSeasonal && itemRow.is(':visible')) {
                    //__utils__.echo('  nth-item: ' + i);
                    //__utils__.echo('isSeasonal: ' + isSeasonal);
                    //__utils__.echo(' isVisible: ' + itemRow.is(':visible'));
                    return false;
                }
            } else {
                if (!isSeasonal && !itemRow.is(':visible')) {
                    return false;
                }
            }
        }
        return true;
    };

    casper.thenLog('Checking seasonal filter checkbox');
    casper.thenClick(seasonalCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.then(function () {
        casper.liveCapture();
        test.assertEval(checkItemRowsVisibility, 'Non seasonal items are hidden', seasonalCheckBoxSelector);
    });

    casper.thenLog('Unchecking seasonal filter checkbox');
    casper.thenClick(seasonalCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.then(function () {
        casper.liveCapture();
        test.assertEval(checkItemRowsVisibility, 'Non seasonal items are shown', seasonalCheckBoxSelector);
    });
    
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});