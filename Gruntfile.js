module.exports = function (grunt) {

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
            protractor_start: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager start'
            }
        },

        clean: {
            build: 'build'
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
            src: {
                expand: true,
                cwd: 'app/src/',
                src: '**',
                dest: 'build/www/'
            }
        },

        connect: {
            options: {
                base: 'build/www'
            },
            testserver: {
                options: {
                    port: 9999
                }
            },
            webserver: {
                options: {
                    port: 8888,
                    keepalive: true,
                    open: true
                }
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                configFile: "./app/test/e2e/protractor.conf.js"
            },
            auto: {
                keepAlive: true,
                options: {
                    args: {
                        seleniumPort: 4444
                    }
                }
            }
        }

    });

    grunt.registerTask('install', ['shell:protractor_install']);

    grunt.registerTask('build', ['copy']);

    grunt.registerTask('default', ['clean', 'build']);

    grunt.registerTask('test:e2e', ['connect:testserver', 'shell:protractor_start', 'protractor']);

    grunt.registerTask('serve', ['clean', 'build', 'connect:webserver']);

};
