(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getItems: getItems,
            getOneItem: getOneItem,
            creatItem: createItem,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getItems() {
            return $http.get('/api/items')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getItems')(e);
            }
        }

        function getOneItem(id) {
            return $http.get('/api/items/' + id)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getOneItem')(e);
            }
        }

        function createItem(name, type) {
            return $http.post('/api/items', {
                name: name,
                type: type
            })
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for createItem')(e);
            }
        }

        function updateItem(id, name, type) {
            return $http.put('/api/items/' + id, {
                name: name,
                type: type
            })
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for updateItem')(e);
            }
        }

        function deleteItem(id) {
            return $http.delete('/api/items/' + id)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for deleteItem')(e);
            }
        }

    }
})();
