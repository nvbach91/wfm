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

    // for ajax calls waits
    globalAjaxIndicatorSelector : '.wfm-global-ajax-indicator',

    // live capturing
    liveCapture                 : true,

    // animationTime - time in ms for animations on client to finish, i.e. used in campaign maintenance edit mode filter
    animationTime               : 1000,

    // DOM manipulation time - time in ms for dom manupulations on client to finish
    domManipulationTime         : 200,

    // path to save screen shots
    screenshotFilePath          : './screenshots/',

    // the name of the screen capture image file
    screenshotFileExtension     : '.png'
};