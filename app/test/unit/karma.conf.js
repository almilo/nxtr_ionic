module.exports = function (config) {

    config.set({
        basePath: '../../../',
        files: [
            // libs
            'build/www/lib/js/ionic.bundle.js',
            'build/www/lib/js/angular/angular-mocks.js',

            // app
            'build/www/js/**/*Module.js',
            'build/www/js/**/*.js',

            // tests
            'app/src/js/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        reporters: ['dots'],
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: true,
        colors: true
    });

};
