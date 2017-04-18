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
// IMPORTANT: use an AD with mixed Item regions NAT and several REG with different names
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD Fr'); 
require('../steps/verifyAdvertisingRegionFilter');

require('../steps/finish');
