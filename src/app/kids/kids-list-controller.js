'use strict';

/**
 * @ngdoc function
 * @name KidsListController
 * @module kidsModule
 * @kind function
 *
 * @description
 *
 * kid list of teacher
 */

angular.module('kidsModule')
	.controller('KidsListController', KidsListController);

function KidsListController($scope, Kids, $state, CurrentUser) {
	$scope.kids;	
	$scope.teacherName = CurrentUser.email;
	$scope.kidsCount;
	$scope.goDetails = goDetails;

	function init(){
		CurrentUser
				.getKids()
				.then(function(data){
						$scope.kids = data.kids
						kidsCount();
				})
	 }

	init();

	function kidsCount(){
		$scope.kidsCount = Object.keys($scope.kids).length;
	}

	function goDetails(name){
		$state.go('admin-panel.default.kid-details', {kidId: name})
	}

}

KidsListController.$inject = [
	'$scope',
	'Kids',
	'$state',
	'CurrentUser'
]



