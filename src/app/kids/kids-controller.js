'use strict';

/**
 * @ngdoc function
 * @name KidsController
 * @module kidsModule
 * @kind function
 *
 * @description
 *
 * CRUD operations for kid data
 */

// get the triangular seed module
angular.module('kidsModule')
// create a controller for the seed page and inject the scope directive
.controller('KidsController', function ($scope) {
    // add some test data to the scope
    $scope.testData = ['triangular', 'is', 'great'];
});