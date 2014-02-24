exports.config = {
    baseUrl: 'http://localhost:9999',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['**/*.spec.js'],

    jasmineNodeOpts: {
        showColors: true
    }
};
