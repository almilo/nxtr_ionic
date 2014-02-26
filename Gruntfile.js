module.exports = function (grunt) {

    var path = require('path');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        shell: {
            options: {
                stdout: true
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            appium_start: {
                command: 'node ./node_modules/appium/bin/appium',
                options: {
                    async: true
                }
            },
            ios_build: {
                command: [
                    'cd build',
                    '../node_modules/ionic/bin/ionic platform ios',
                    '../node_modules/ionic/bin/ionic build ios'
                ].join('&&')
            },
            ios_start: {
                command: [
                    'cd build',
                    '../node_modules/ionic/bin/ionic emulate ios'
                ].join('&&')
            }
        },

        clean: {
            build: 'build',
            temp: 'temp',
            instrumentscli: 'instrumentscli*/'
        },

        copy: {
            cordova_hidden: {
                expand: true,
                cwd: 'cordova/.cordova/',
                src: '**',
                dest: 'build/.cordova/'
            },
            cordova: {
                expand: true,
                cwd: 'cordova/',
                src: '**',
                dest: 'build/',
                options: {
                    mode: true
                }
            },
            lib: {
                expand: true,
                cwd: 'app/lib/',
                src: '**',
                dest: 'build/www/lib/'
            },
            img: {
                expand: true,
                cwd: 'app/src/',
                src: ['img/**', 'index.html'],
                dest: 'build/www/'
            }
        },

        ngtemplates: {
            nxtr: {
                cwd: 'app/src/js/',
                src: '**/*.tpl.html',
                dest: 'temp/templates.js'
            }
        },

        concat_sourcemap: {
            js: {
                src: [
                    'app/src/js/**/*Module.js',
                    'app/src/js/**/*.js',
                    'temp/templates.js',
                    '!app/src/js/**/*.spec.js'
                ],
                dest: 'build/www/app.js'
            },
            css: {
                src: 'app/src/css/**/*.css',
                dest: 'build/www/app.css'
            }
        },

        connect: {
            options: {
                base: 'build/www'
            },
            devserver: {
                options: {
                    port: 7777,
                    livereload: true,
                    open: true
                }
            },
            webserver: {
                options: {
                    port: 8888,
                    keepalive: true,
                    open: true
                }
            },
            testserver: {
                options: {
                    port: 9999
                }
            }
        },

        protractor: {
            options: {
                configFile: "./app/test/e2e/protractor.conf.js"
            },
            ios_safari: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:9999',
                        seleniumPort: 4723,
                        capabilities: {
                            browserName: '',
                            device: 'iphone',
                            app: 'safari'
                        }
                    }
                }
            },
            ios_app: {
                options: {
                    args: {
                        baseUrl: '',
                        seleniumPort: 4723,
                        capabilities: {
                            browserName: '',
                            device: 'iphone',
                            app: path.resolve('build/platforms/ios/build/emulator/NxtrApp.app')
                        }
                    }
                }
            },
            singlerun: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:9999',
                        capabilities: {
                            'browserName': 'chrome'
                        }
                    }
                }
            },
            autowatch: {
                keepAlive: true,
                options: {
                    args: {
                        baseUrl: 'http://localhost:9999',

                        capabilities: {
                            'browserName': 'chrome'
                        }
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            app: {
                files: ['app/**'],
                tasks: ['build']
            }
        },

        karma: {
            unit: {
                configFile: './app/test/unit/karma.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_autowatch: {
                configFile: './app/test/unit/karma.conf.js',
                autoWatch: true,
                singleRun: false
            }
        }

    });


    // Install tasks
    grunt.registerTask('install', ['shell:protractor_install']);

    // Build tasks
    grunt.registerTask('build', ['copy', 'ngtemplates', 'concat_sourcemap']);

    // Test tasks
    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('test:e2e', ['connect:testserver', 'protractor:singlerun']);
    grunt.registerTask('test:e2e_ios_safari', ['connect:testserver', 'shell:appium_start', 'protractor:ios_safari', 'shell:appium_start:kill']);
    grunt.registerTask('test:e2e_ios_app', ['shell:ios_build', 'shell:appium_start', 'protractor:ios_app', 'shell:appium_start:kill']);
    grunt.registerTask('test', ['test:unit', 'test:e2e']);

    grunt.registerTask('dev', ['clean', 'build', 'connect:devserver', 'watch']);
    grunt.registerTask('serve', ['clean', 'build', 'connect:webserver']);
    grunt.registerTask('ios', ['clean', 'build', 'shell:ios_build', 'shell:ios_start']);

    // Default task
    grunt.registerTask('default', ['clean', 'build', 'test']);

};
