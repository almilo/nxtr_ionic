describe("SearchService", function () {
    var SearchService;

    beforeEach(module('nxtr.search'));

    beforeEach(inject(function (_SearchService_) {
        SearchService = _SearchService_;
    }));

    it("should return a collection of objects", function () {
        expect(SearchService.get()).toEqual([
            {name: 'one'},
            {name: 'two'},
            {name: 'three'}
        ]);
    });

});
