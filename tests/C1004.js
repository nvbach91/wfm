/* global require */
/**
 * Test for
 * Campaign Maintenance > Filters > Advertising Dates
 * - Display items in Advertising date
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');
require('../steps/verifyAdvertisingDateFilterList');

// IMPORTANT: use a not signed off AD
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-24'); 

// IMPORTANT: use a signed off AD
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-18'); 

require('../steps/finish');
