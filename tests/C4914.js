/* global require */
/**
 * Test for Edit AD Remark in Campaign Maintenance page 
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');

require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD Fr');

require('../steps/openEditMode');

require('../steps/verifyAdvertisingDateEditRemark');