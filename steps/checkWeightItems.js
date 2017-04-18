/**
 * In edit mode click on weight-item checkbox and validate that item rows are hidden / shown
 * only works individually (no other filters are applied)
 */
casper.test.begin('Testing weight-items filter in edit mode', function suite(test) {
    var weightItemCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:weight-item-toggle"]';

    var checkItemRowsVisibility = function (wicbs) {
        var isCheckedWeightItemsFilter = jQuery(wicbs).is(':checked');
        __utils__.echo('Checked: ' + isCheckedWeightItemsFilter);
        var itemRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
        for (var i = 0; i < itemRows.size(); i++) {
            var itemRow = itemRows.eq(i);
            var weightInput = itemRow.find('.wfm-fc-campaign-items-panel-weight-per-piece-col input');

            if (isCheckedWeightItemsFilter) {
                if (!/^\d+$/.test(weightInput.val()) && !weightInput.hasClass('weightItem')) {
                    if (itemRow.is(':visible')) {
                        return false;
                    }
                }
            } else {
                if (/^\d+$/.test(weightInput.val()) || weightInput.hasClass('weightItem')) {
                    if (!itemRow.is(':visible')) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    
    casper.thenLog('Checking weight-items checkbox');
    casper.thenClick(weightItemCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, checkItemRowsVisibility, 'Item rows which don\'t have have weight value and don\'t have weightItem flag are hidden', weightItemCheckBoxSelector);

    casper.thenLog('Unchecking weight-items checkbox');
    casper.thenClick(weightItemCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, checkItemRowsVisibility, 'Item rows which don\'t have have weight value and don\'t have weightItem flag are visible', weightItemCheckBoxSelector);

    casper.run(function () {
        test.done();
        casper.echo('');
    });
});