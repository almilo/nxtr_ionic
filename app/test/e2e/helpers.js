(function () {
    'use strict';

    var activateWebView = function (driver) {
        return driver.getAllWindowHandles()
            .then(function (handles) {
                for (var handle in handles) {
                    var hdl = handles[handle];
                    if (hdl.indexOf('WEBVIEW') > -1) {
                        return hdl;
                    }
                }
                return handles[0];
            }).then(function (handle) {
                driver.switchTo().window(handle);
            });
    }

    exports.initApp = function () {
        activateWebView(browser);
        browser.get('');
    }

})();
