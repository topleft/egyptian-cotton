(function() {
    'use strict';
    angular.module('app.components.crudInput')
        .directive('crudInput', crudInputDirective);

    function crudInputDirective() {
        return {
            restrict: 'E', 
            templateUrl: 'app/components/crudInput/crudInput.html',
            scope: {},
            controller: crudInputController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    crudInputController.$inject = [ 'dataservice', 'frontEndDataService'];

    function crudInputController(dataservice, frontEndDataService) {
        var vm = this;
        console.log(vm);

        vm.createItem = createItem;

        function createItem () {
            console.log('Test: ', vm.name, vm.type);
            var newItem = dataservice.createItem(vm.name, vm.type);
            frontEndDataService.addItem(newItem);   
        }


    }

})();
