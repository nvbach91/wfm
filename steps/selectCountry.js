/**
 * Select the country by the id provided in config and wait for page to update
 */
var select = function (countryId) {
    casper.test.begin('WFM Select Country', function suite(test) {
        // select country
        casper.then(function () {
            
            /*var foodCampaignTabSelector = 'li.selected.parent-nav-item';
            test.assertElementCount(foodCampaignTabSelector, 1);
            test.assertEvalEquals(function(fctSelector) {
                return jQuery(fctSelector).children('a').attr('href');
            }, config.foodCampaignTabPath, "Confirmed that Food Campaigns tab is selected", foodCampaignTabSelector);*/

            casper.mlog('Selecting country');
            casper.evaluate(function (cId) {
                jQuery('select[name="country-division-selection"]').val(cId).parent().submit();
            }, countryId);
            casper.waitForSelector('select[name="country-division-selection"] option[selected][value="' + countryId + '"]').thenLiveCapture();
        }).run(function () {
            test.done();
            casper.echo('');
        });
    });
};

exports.select = select;
