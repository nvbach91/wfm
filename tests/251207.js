/* global require */
/**
 * Test for
 * Campaign Maintenance > Filters > Advertising Items
 * - Display items in Advertising date
 * - Filter items with search input 
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');
require('../steps/selectAdvertisingDateAndDisplayItems');

require('../steps/searchAdvertisingDateItems').search('0');
require('../steps/searchAdvertisingDateItems').search('9');


require('../steps/finish');
