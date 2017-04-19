/**
 * Checks initial value of the adverising dates filter
 * Checks the list items order*
 */
casper.test.begin('Advertising dates filter', function suite(test) {
    casper.thenAssertEval(test, function () {
        var advertisingDateSelectList = jQuery('[name="advertising-date-select"]');
        var isSelectedFirstItem = advertisingDateSelectList.children().eq(0).is(':selected');
        return isSelectedFirstItem;
    }, 'Default selected Advertising date is set to the first Advertising date on the list');
    
    casper.then(function () {
        // TODO ASSERT (advertising dates start dates are not available)
        casper.echo('Advertising dates in the selection list:');
        casper.evaluate(function () {
            var advertisingDateSelectList = jQuery('[name="advertising-date-select"]');
            var isSortedAdvertisingDatesInFilter;
            advertisingDateSelectList.children().each(function () {
                __utils__.echo(jQuery(this).text().trim());
            });
        });
        
    });
    
    casper.run(function () {
        test.done();
        casper.echo('');
    });
});
