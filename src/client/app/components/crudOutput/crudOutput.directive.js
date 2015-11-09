(function() {
    'use strict';
    angular.module('app.components.crudOutput')
        .directive('crudOutput', crudOutputDirective);

    function crudOutputDirective() {
        return {
            restrict: 'E', 
            templateUrl: 'app/components/crudOutput/crudOutput.html',
            scope: {},
            controller: crudOutputController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    crudOutputController.$inject = [ 'dataservice', 'frontEndDataService'];

    function crudOutputController(dataservice, frontEndDataService) {
        var vm = this;
        initOutput();
        vm.update = false;
        vm.del = false;

        vm.toggleUpdate = toggleUpdate;
        vm.updateItem = updateItem;
        vm.confirmDelete = confirmDelete;
        vm.deleteItem = deleteItem;



        function initOutput() {
            dataservice.getItems()
            .success(function(response) {
                vm.items = response;
                frontEndDataService.populateAllItems(vm.items);
            });
        }

        function toggleUpdate(id){
            vm.update = id;
        }
        function updateItem(id, name, type){
            dataservice.updateItem(id, name, type)
            .then(frontEndDataService.updateItem);

            vm.update = false;
        }
        function confirmDelete(id){
            vm.del = id;
        };
        function deleteItem(id){
            dataservice.deleteItem(id)
                .then(function(data){
                    frontEndDataService.deleteItem(id);
                });
        };



    }

})();
