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
            dataservice.createItem(vm.name, vm.type)
                .then(function(response){
                    var newItem = response.data[0];
                    frontEndDataService.addItem(newItem);   
                });
        }


    }

})();
