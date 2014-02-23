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
            webserver: {
                options: {
                    port: 8888,
                    keepalive: true,
                    open: true
                }
            }
        }

    });

    grunt.registerTask('install', ['shell:protractor_install']);

    grunt.registerTask('build', ['copy']);

    grunt.registerTask('default', ['clean', 'build']);

    grunt.registerTask('serve', ['clean', 'build', 'connect:webserver']);

};
