/**
 * Test for
 * Campaign Maintenance > Filters > Filter in edit mode
 */
var config = require('./config');
require('./setup');

require('./steps/goToCampaignMaintenancePage');
require('./steps/selectAdvertisingDateAndDisplayItems');

require('./steps/openEditMode');
require('./steps/selectWithoutMHD');

require('./steps/finish');
