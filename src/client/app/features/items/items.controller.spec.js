/* jshint -W117, -W030 */
describe('ItemsController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.features.items');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('ItemsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Items controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Items', function() {
                expect(controller.title).to.equal('Items');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
