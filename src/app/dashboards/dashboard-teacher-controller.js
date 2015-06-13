'use strict';

/**
 * @ngdoc function
 * @name DashboardTeacherController
 * @module triAngularDashboards
 * @kind function
 *
 *
 */
angular.module('triAngularDashboards').
controller('DashboardTeacherController', function ($scope, $timeout, $mdToast, CurrentUser) {
   
    $scope.kids = [];
    $scope.init = init;

    function init(){
        CurrentUser
            .getKids()
            .then(function(data){
                $scope.kids = data.kids
            })
    }




    $scope.init();

});