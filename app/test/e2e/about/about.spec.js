describe('About page', function () {

    var activateWebView = require('../helpers').activateWebView;

    beforeEach(function () {
        activateWebView(browser);
        browser.get('');

        element(by.linkText('About')).click();
    });

    it('should contain About Next Train', function () {
        expect(browser.getTitle()).toContain('About Next Train');
    });

});
