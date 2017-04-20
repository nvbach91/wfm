/* global require */
/**
 * Test for Edit AD Remark in Campaign Maintenance page 
 */
var config = require('../config');
require('../setup');

require('../steps/goToCampaignMaintenancePage');

// IMPORTANT: use a not signed off AD for better results, 
// you can also use a signed off AD but it will only test for disabled seasonal checkboxes
// also check if the AD has any items in it
// try: AD Fr           is not signed off with many items, 
// try: AD-16           is signed off with many items
// try: ad 11.6.2013    is signed off with no items
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD Fr');

require('../steps/verifyAdvertisingDateEditSeasonalItems').verify();

/*
require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('AD-16');

require('../steps/verifyAdvertisingDateEditSeasonalItems').verify();


require('../steps/selectAdvertisingDateAndDisplayItems').searchAllAdvertisingDateItems('ad 11.6.2013');

require('../steps/verifyAdvertisingDateEditSeasonalItems').verify();*/