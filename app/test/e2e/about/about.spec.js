describe('about page', function () {

    beforeEach(function () {
        browser.get('#/tab/about');
    });

    it('should contain Next Train', function () {
        expect(browser.getTitle()).toContain('About Next Train');
    });

});
