angular.module('nxtr', ['ionic'])


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "js/tabs.tpl.html"
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'js/about/about.tpl.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/about');

});

