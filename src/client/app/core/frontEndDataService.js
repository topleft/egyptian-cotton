(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('frontEndDataService', frontEndDataService);

    frontEndDataService.$inject = ['exception', 'logger'];
    /* @ngInject */
    function frontEndDataService(exception, logger) {
        var service = {
            items: [],
            addItem: addItem,
            getOneItem: getOneItem,
            getItems: getItems,
            removeItem: removeItem,
            updateItem: updateItem

            
        };

        return service;

        function addItem(item) {
            service.items.push(item);
        }

        function removeItem(id) {
            return service.items.forEach(function(item, i, arr) {
                if (item._id === id) {
                    arr.splice(i, 1);
                }
            });
        }

        function getOneItem(id) {
            return service.items.forEach(function(item) {
                if (item._id === id) {
                    return item;
                }
            });
        }

        function getItems() {
            return service.items;
        }

        // takes an object of keys with values to update
        function updateItem(id, obj) {
            return service.items.forEach(function(item) {
                if (item._id === id) {
                    for (key in obj) {
                        item.key = obj.key;
                    }
                    return item;
                }
            });
        }

        
    }
})();
