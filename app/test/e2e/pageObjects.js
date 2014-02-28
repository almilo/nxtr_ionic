(function () {
    'use strict';

    exports.Tabs = function() {
        this.selectSearch =function() {
            element(by.linkText('Search')).click();
        };

        this.selectAbout =function() {
            element(by.linkText('About')).click();
        };
    };

})();
