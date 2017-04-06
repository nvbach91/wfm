/**
 * The last step to every test case. capture the screen if you want
 */
casper.test.begin('Finish', function suite(test) {
    casper.then(function () {
        casper.capture(config.screenshotFilePath + 'finish' + config.screenshotFileExtension);
    }).run(function () {
        casper.echo('');
        test.done();
    });
});