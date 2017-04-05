/**
 * In edit mode click on Without MHD and validate that all item rows with MHD in both MHD columns are hidden
 */
casper.test.begin('Click on without MHD', function suite(test) {
    casper.then(function () {
        var withoutMhdCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:no-mhd-toggle"]';
        casper.click(withoutMhdCheckBoxSelector);
        //casper.wait(1000, function () { // might wait for animation of hiding?
            test.assertEval(function () {
                var itemRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
                for (var i = 0; i < itemRows.size(); i++) {
                    var itemRow = itemRows.eq(i);
                    var worstMhdCellText = itemRow.children().eq(8).text();
                    var bestMhdCellText = itemRow.children().eq(9).text();
                    var dateRegex = /\d{2}\/\d{2}\/\d{2}/;
                    if (dateRegex.test(worstMhdCellText && dateRegex.test(bestMhdCellText))) {
                        if (itemRow.is(':visible')) {
                            return false;
                        }
                    }
                }
                return true;
            }, 'Item rows which have MHD in both MHD columns are hidden', null);
        //});
    }).run(function () {test.done()});
});