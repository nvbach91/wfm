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

// IMPORTANT: use and AD with many paginations for better test results
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-24');

require('../steps/verifyPagination');

require('../steps/finish');
