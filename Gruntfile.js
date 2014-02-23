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
            },
            ios_start: {
                command: [
                    'cd build',
                    'ionic build ios',
                    'ionic emulate ios'
                ].join('&&')
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
    grunt.registerTask('build', ['copy']);

    // Test tasks
    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('test:e2e', ['connect:testserver', 'shell:protractor_start', 'protractor']);
    grunt.registerTask('test', ['test:unit', 'test:e2e']);

    grunt.registerTask('dev', ['clean', 'build', 'connect:devserver', 'watch']);
    grunt.registerTask('serve', ['clean', 'build', 'connect:webserver']);
    grunt.registerTask('ios', ['clean', 'build', 'shell:ios_start']);

    // Default task
    grunt.registerTask('default', ['clean', 'build', 'test']);

};
