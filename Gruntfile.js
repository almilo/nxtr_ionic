module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.registerTask('default', function() {
        var message = grunt.template.process('Application: "<%= pkg.name%>", version: <%= pkg.version%>.');
        grunt.log.write(message);
    });

};
