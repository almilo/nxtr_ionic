(function () {
    'use strict';

    function activateWebView(driver) {
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

    exports.activateWebView = activateWebView;
})();
