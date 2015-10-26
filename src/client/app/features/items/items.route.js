(function() {
    'use strict';

    angular
        .module('app.features.items')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'items',
                config: {
                    url: '/items',
                    templateUrl: 'app/features/items/items.html',
                    controller: 'ItemsController',
                    controllerAs: 'vm',
                    title: 'Items',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Items'
                    }
                }
            }
        ];
    }
})();
