/* jshint -W117, -W030 */
describe('items routes', function () {
    describe('state', function () {
        var view = 'app/features/items/items.html';

        beforeEach(function() {
            module('app.features.items', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state items to url /items ', function() {
            expect($state.href('items', {})).to.equal('/items');
        });

        it('should map /items route to items View template', function () {
            expect($state.get('items').templateUrl).to.equal(view);
        });

        it('of items should work with $state.go', function () {
            $state.go('items');
            $rootScope.$apply();
            expect($state.is('items'));
        });
    });
});
