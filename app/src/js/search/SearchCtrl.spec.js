describe("SearchCtrl", function () {
    var SearchCtrl, scope;

    beforeEach(module('nxtr.search', function ($provide) {
        var SearchService = jasmine.createSpyObj('SearchService', ['get']);
        SearchService.get.andReturn([
            {
                name: 'arrival'
            }
        ]);
        $provide.value('SearchService', SearchService);
    }));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        SearchCtrl = $controller('SearchCtrl', {$scope: scope});
    }));

    it("should return initialize scope with the arrivals", function () {
        expect(scope.arrivals).toEqual([
            {name: 'arrival'}
        ]);
    });

});
