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

        console.log('in crudInput controller');

    }

})();
