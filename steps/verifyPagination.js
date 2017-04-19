/**
 * In edit mode click on seasonal items checkbox filter and validate that item rows are hidden / shown
 * only works individually (no other filters are applied)
 */
casper.test.begin('Testing pagination if exists', function suite(test) {

    var paginationContainerSelector = '.wfm-campaigndb-maintenance-campaign-items-toolbar-table';

    casper.mlog('Checking pagination');
    test.assertEval(function (pcs) {
        var nItemsPerPagination = 25;

        var paginationText = jQuery(pcs).text().trim().replace(/[\s+<>]/g, '');
        __utils__.echo('Pagination Text: ' + paginationText.split('').join(' '));
        
        var nItemsOnPage = jQuery('.wfm-fc-campaign-items-panel-item-row').size();

        if (nItemsOnPage > nItemsPerPagination) {
            __utils__.echo('There are more than ' + nItemsPerPagination + ' items on one page: ' + nItemsOnPage);
            return false;
        }

        return true;
    }, 'The correct pagination range is displayed', paginationContainerSelector);

    casper.then(function () {
        var nPaginations = casper.evaluate(function (pcs) {
            return jQuery(pcs).text().trim().replace(/[\s+<>]/g, '').length;
        }, paginationContainerSelector);

        casper.echo('Number of paginations: ' + nPaginations);

        if (nPaginations <= 1) {
            return casper.warnNoDataToTest();
        }
        casper.thenLog('Go to last pagination');
        casper.thenClick('a[title="Go to last page"]');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.then(function () {
            test.assertDoesntExist('a[title="Go to last page"]', 'Last pagination link is disabled on the last page');
            test.assertDoesntExist('a[title="Go to next page"]', 'Next pagination link is disabled on the last page');
        });
        
        casper.thenLog('Go to first pagination');
        casper.thenClick('a[title="Go to first page"]');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.then(function () {
            test.assertDoesntExist('a[title="Go to first page"]', 'First pagination link is disabled on the first page');
            test.assertDoesntExist('a[title="Go to previous page"]', 'Previous pagination link is disabled on the first page');
        });

        casper.thenLog('Go to next pagination');
        casper.thenClick('a[title="Go to next page"]');
        casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
        casper.thenLiveCapture();
        casper.thenAssertEval(test, function () {
            var navigationLinks = jQuery('.wfm-campaigndb-maintenance-campaign-items-toolbar-table').find('div').children();
            if (navigationLinks.eq(3).find('a').size()) {
                return false;
            }
            return true;
        }, 'The current pagination link is disabled');
        
        if (nPaginations > 3) {
            casper.thenLog('Go to specific pagination number ' + nPaginations);
            casper.thenClick('a[title="Go to page ' + nPaginations + '"]');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertEval(test, function (pn) {
                return jQuery('.wfm-campaigndb-maintenance-campaign-items-toolbar-table').find('span[title="Go to page ' + pn + '"]').size() === 1;
            }, 'The specific pagination link is disabled', nPaginations);
        }

        if (nPaginations > 2) {
            var specificPagination = nPaginations - 1;
            casper.thenLog('Go to specific pagination number ' + specificPagination);
            casper.thenClick('a[title="Go to page ' + specificPagination + '"]');
            casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
            casper.thenLiveCapture();
            casper.thenAssertEval(test, function (pn) {
                return jQuery('.wfm-campaigndb-maintenance-campaign-items-toolbar-table').find('span[title="Go to page ' + pn + '"]').size() === 1;
            }, 'The specific pagination link is disabled', specificPagination);
        }

        // TODO ? verify pagionation content

    });
    //casper.thenClick();
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});