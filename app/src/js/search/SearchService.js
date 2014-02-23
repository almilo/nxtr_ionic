angular.module('nxtr.search')
    .factory('SearchService', function () {
        return {
            get: function () {
                return [
                    {name: 'one'},
                    {name: 'two'},
                    {name: 'three'}
                ];
            }
        }
    });
