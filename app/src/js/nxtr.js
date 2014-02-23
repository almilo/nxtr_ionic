angular.module('nxtr', ['ionic', 'nxtr.search'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "tabs.tpl.html"
            })

            .state('tab.search', {
                url: '/search',
                views: {
                    'search-tab': {
                        templateUrl: 'search/search.tpl.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'about/about.tpl.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/search');

    });

