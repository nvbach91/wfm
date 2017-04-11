/**
 * In edit mode click on Without MHD and validate that all item rows with MHD in both MHD columns are hidden
 */
casper.test.begin('Select seasonal items filter in edit mode', function suite(test) {
    casper.then(function () {
        var seasonalCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:seasonal-item-toggle"]';
        casper.click(seasonalCheckBoxSelector);
        casper.wait(config.animationTime, function () { // might wait for animation of hiding?
            test.assertEval(function () {
                var itemRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
                for (var i = 0; i < itemRows.size(); i++) {
                    var itemRow = itemRows.eq(i);
                    var isSeasonal = itemRow.find('.wfm-fc-campaign-items-panel-seasonal-item-col input').is(':checked');
                    if (!isSeasonal && itemRow.is(':visible')) {
                        __utils__.echo('  nth-item: ' + i);
                        __utils__.echo('isSeasonal: ' + isSeasonal);
                        __utils__.echo(' isVisible: ' + itemRow.is(':visible'));
                        return false;
                    } 
                }
                return true;
            }, 'Non seasonal items are hidden', null);
        });
    }).run(function () {test.done();});
});