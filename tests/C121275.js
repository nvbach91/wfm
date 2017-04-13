/* global require */
/**
 * Test for
 * Campaign Maintenance > Filters > Filter in edit mode
 * - Displays items in Advertising date
 * - Opens edit mode
 * - Tries to use without MHD filter
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-4');

require('../steps/openEditMode');
require('../steps/checkWithoutMHD');
require('../steps/checkSeasonal');
require('../steps/checkWeightItems');

require('../steps/finish');
