describe('Tabs navigation', function () {

    var initApp = require('../helpers').initApp;
    var Tabs = require('../pageObjects').Tabs;

    var tabs;

    beforeEach(function () {
        initApp();

        tabs = new Tabs();
    });

    describe("About tab", function() {

        it('should navigate to a page with "About Next Train" in title', function () {
            tabs.selectAbout();

            expect(browser.getTitle()).toContain('About');
        });

    });

    describe("Search tab", function() {

        it('should navigate to a page with "Search" in title', function () {
            tabs.selectSearch();

            expect(browser.getTitle()).toContain('Search');
        });

    });

});
