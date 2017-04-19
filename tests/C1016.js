/* global require */
/**
 * Test if the manuall add item to Advertising date in the campaign maintenance page leads to master data/advertising items
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');

// IMPORTANT: when using a not signed off date, the add button should be enabled
// use an advertising date with some items to verify that the Advertising Items page's 
// edit dialog contains the same items
// Advertising with no items can still pass
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-24');

require('../steps/verifyConnectionToAddNewItemInMasterData');

require('../steps/finish');
