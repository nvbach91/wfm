/**
 * Enter some values to the AD Remark input and try to save
 * Needs the Edit modal box to be opened first
 */
casper.test.begin('Testing connection to add new item in master data', function suite(test) {
    var generateRandomString = function (length) {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var s = '';
        for (var i = 0; i < length; i++) {
            s += possible.charAt(casper.randomIntBetween(0, possible.length));
        }
        return s;
    };
    var remarkInputCSS = 'input[name="data-box:data-box_body:advertising-date-info-panel:remark:text-component"]';
    var saveButtonCSS = 'a.wfm-link-save';
    casper.thenSendKeys(remarkInputCSS, generateRandomString(casper.randomIntBetween(301, 400)), {reset: true});
    casper.thenLiveCapture();
    casper.thenClick(saveButtonCSS);
    casper.waitForSelector('span.feedbackPanelERROR');
    casper.thenLiveCapture();
    casper.thenAssertEval(test, function () {
        return /300 characters/.test(jQuery('span.feedbackPanelERROR').text());// === "The value of 'remark' is longer than the maximum of 300 characters.";
    }, 'Remark edit error message appeared when trying to save more than 300 characters');

    var randomRemarkString = generateRandomString(casper.randomIntBetween(0, 300));
    casper.thenSendKeys(remarkInputCSS, randomRemarkString, {reset: true});
    casper.thenLiveCapture();
    casper.thenClick(saveButtonCSS);
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, function (randomRemarkString) {
        return jQuery('.fc_advertising_date_info_panel label:last-child .multiselect_dropdown_holder span').text().trim() === randomRemarkString;
    }, 'The remark value saved appeared on the Advertising date overview info panel', randomRemarkString);

    // open edit mode
    casper.thenClick('a.wfm-link-edit');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    casper.thenClick('a.wfm-link-cancel');
    casper.waitWhileVisible(config.globalAjaxIndicatorSelector);
    casper.thenLiveCapture();
    casper.thenAssertEval(test, function (randomRemarkString) {
        return jQuery('.fc_advertising_date_info_panel label:last-child .multiselect_dropdown_holder span').text().trim() === randomRemarkString;
    }, 'After clicking cancel, the remark value remains the same', randomRemarkString);

    casper.run(function () {
        test.done();
        casper.echo('');
    });
});