/**
 * In edit mode click on Without MHD and validate that all item rows with MHD in both MHD columns are hidden
 */
casper.test.begin('Testing without MHD filter in edit mode', function suite(test) {
    var withoutMhdCheckBoxSelector = 'input[name="data-box:data-box_body:edit-mode-toolbar:edit-mode-toolbar_body:edit-mode-filter-box:no-mhd-toggle"]';
    var checkItemRowsVisibility = function (wmcbs) {
        var isCheckedWithoutMhdFilter = jQuery(wmcbs).is(':checked');
        __utils__.echo('Checked: ' + isCheckedWithoutMhdFilter);
        var itemRows = jQuery('.wfm-fc-campaign-items-panel-item-row');
        for (var i = 0; i < itemRows.size(); i++) {
            var itemRow = itemRows.eq(i);
            var worstMhdCellText = itemRow.children().eq(8).text();
            var bestMhdCellText = itemRow.children().eq(9).text();
            var dateRegex = /\d{2}\/\d{2}\/\d{2}/;
            if (isCheckedWithoutMhdFilter) {
                if (dateRegex.test(worstMhdCellText && dateRegex.test(bestMhdCellText))) {
                    if (itemRow.is(':visible')) {
                        return false;
                    }
                }
            } else {
                if (dateRegex.test(worstMhdCellText && dateRegex.test(bestMhdCellText))) {
                    if (!itemRow.is(':visible')) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    casper.thenLog('Checking without MHD checkbox');
    casper.thenClick(withoutMhdCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.then(function () {
        casper.liveCapture();
        test.assertEval(checkItemRowsVisibility, 'Item rows which have MHD in both MHD columns are hidden', withoutMhdCheckBoxSelector);
    });

    casper.thenLog('Unchecking without MHD checkbox');
    casper.thenClick(withoutMhdCheckBoxSelector);
    casper.wait(config.animationTime);
    casper.then(function () {
        casper.liveCapture();
        test.assertEval(checkItemRowsVisibility, 'Item rows which have MHD in both MHD columns are shown', withoutMhdCheckBoxSelector);
    });

    casper.run(function () {
        test.done();
        casper.echo('');
    });
});