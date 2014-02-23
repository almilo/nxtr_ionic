angular.module('nxtr.search', [])
    .controller('SearchCtrl', function ($scope, SearchService) {
        $scope.arrivals  = SearchService.get();
    });
