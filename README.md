NXTR - Next Train App implemented with Ionic framework and Cordova
==================================================================

This is a sample mobile application based on the opendata.ch Transport API (http://transport.opendata.ch) which allows
the user to visualize the schedule of the upcoming trains, tramways and buses for a specific stop.

The App is itself a show case to demonstrate how to achieve the following goals:
 - Implementing a mobile application with Phonegap, AngularJS and the Ionic framework
 - Building and packaging an optimized JS application with GruntJS
 - Automated unit testing with Karma
 - Automated e2e testing with Protractor (as web application in mobile browser and as mobile application in the iOS emulator)
 - Integration with CI servers (Travis CI)
 - Code signing and delivery to a test group

To install and build / run the application, please follow these steps:
 - Install NodeJS (npm required): follow instructions in http://nodejs.org or use 'homebrew' if already installed
 - Install Cordova: execute 'sudo npm -g cordova'
 - Clone the Github repository: 'git clone https://github.com/almilo/nxtr_ionic.git'
 - Once the repository has been cloned, execute:
    + 'cd <cloned_directory>' (ex: 'cd nxtr_ionic')
    + 'npm install' (to install dependencies)
    + 'grunt install' (to perform other required install tasks like webdriver-manager update)

Grunt goals:
 - 'grunt': default task that executes the sub-tasks 'clean', 'build' and 'test'. This last task performs a build of the
   web application, a unit test run with Karma and Chrome and a e2e test run with Protractor using the iOS emulator and
   mobile Safari against a Connect web server hosting the web application.
 - 'grunt dev': task to support the 'dev flow' that builds the web application, starts a web server with 'livereload' and
   watches the source files to reload the application when changes are saved
 - 'grunt serve': builds and opens the web application in the default browser against a local web server
 - 'grunt ios': builds and opens the Cordova application in the iOS emulator (requires a Mac computer with XCode)

Pending goals:
 - Integrate with Travis CI
 - Automate code signing
 - Deliver the signed application to a public web server
 - Implement the real functionality ;)
