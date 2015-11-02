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

    crudInputController.$inject = [ 'dataservice'];

    function crudInputController(dataservice) {
        var vm = this;

        function createItem (name, type) {
            dataservice.createItem(name, type)
                .success(function(data){
                    // need front end dataservice 
                    //dataservice.addItemToList(data);
                })
                .fail(function(err){
                    console.log(err);
                })

        }



    }

})();
