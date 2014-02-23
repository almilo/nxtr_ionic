angular.module('nxtr', ['ionic', 'nxtr.search'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "js/tabs.tpl.html"
            })

            .state('tab.search', {
                url: '/search',
                views: {
                    'search-tab': {
                        templateUrl: 'js/search/search.tpl.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'js/about/about.tpl.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/search');

    });

