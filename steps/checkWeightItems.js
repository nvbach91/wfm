/**
 * In edit mode click on Without MHD and validate that all item rows with MHD in both MHD columns are hidden
 */
casper.test.begin('Select weight-items filter in edit mode', function suite(test) {
    casper.then(function () {
        var itemRowSelector = '.wfm-fc-campaign-items-panel-item-row';
        var weightItemCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:weight-item-toggle"]';
        casper.click(weightItemCheckBoxSelector);
        casper.wait(config.animationTime, function () { // might wait for animation of hiding?
            test.assertEval(function () {
                var itemRows = jQuery(itemRowSelector);
                for (var i = 0; i < itemRows.size(); i++) {
                    var itemRow = itemRows.eq(i);
                    var weightInput = itemRow.find('.wfm-fc-campaign-items-panel-weight-per-piece-col input');
                    if (!/^\d+$/.test(weightInput.val()) && !weightInput.hasClass('weightItem')) {
                        if (itemRow.is(':visible')) {
                            __utils__.echo('weightInput:        ' + (weightInput.val() || "empty"));
                            __utils__.echo('weightItem class:   ' + weightInput.hasClass('weightItem'));
                            __utils__.echo('itemRow is visible: ' + itemRow.is(':visible'));
                            return false;
                        }
                    }
                }
                return true;
            }, 'Item rows which don\'t have have weight value and don\'t have weightItem flag are hidden', null);
        });
    }).run(function () {test.done()});
});