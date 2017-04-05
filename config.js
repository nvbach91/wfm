/**
 * Global config values
 */
module.exports = {
    // the base URL of the testing application
    baseUrl                     : 'http://wfmfcvm01:6333',

    // username for login
    username                    : 'nvb',

    // password for login
    password                    : 'test',

    // the country id for testing
    countryId                   : -1, // FJ

    // the url path of the module for testing
    foodCampaignTabPath         : '/web/guest/ldfc',

    // the advertising date to test
    exampleAdvertisingDateDesc  : 'AD-10',





    
    // wherther to capture screens at assertion steps
    recordVideo                 : true,

    // path to save screen shots
    screenshotFilePath          : './screenshots/',

    // the name of the screen capture image file
    screenshotFileExtension     : '.png',
};