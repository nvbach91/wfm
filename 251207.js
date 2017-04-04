/**
 * Test for
 * Campaign Maintenance > Filters > Advertising Items
 */
var config = require('./config');
require('./setup');

require('./steps/goToCampaignMaintenancePage');
require('./steps/selectAdvertisingDateAndDisplayItems');

require('./steps/searchAdvertisingDateItems').search('0');


require('./steps/finish');
