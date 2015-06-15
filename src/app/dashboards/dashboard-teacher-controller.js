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
controller('DashboardTeacherController', function ($scope, $timeout, $mdToast, CurrentUser, $state) {

    $scope.kids = [];
    $scope.goDetails = goDetails;

    function init(){
        console.log('init')
        console.log(CurrentUser);
        CurrentUser
            .getKids()
            .then(function(data){
                $scope.kids = data.kids
            })
    }

    function goDetails(name){
        $state.go('admin-panel.default.kid-details', {kidId: name})
    }

    init();

});