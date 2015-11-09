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
        console.log('Output');
        

        initOutput();

        function initOutput() {
            dataservice.getItems()
            .success(function(response) {
                vm.items = response;
                console.log(vm.items);
            });
        }



        

    }

})();
