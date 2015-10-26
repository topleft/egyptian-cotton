(function () {
    'use strict';

    angular
        .module('app.features.items')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['logger'];
    /* @ngInject */
    function ItemsController(logger) {
        var vm = this;
        vm.title = 'Items';

        activate();

        function activate() {
            logger.info('Activated Items View');
        }
    }
})();
