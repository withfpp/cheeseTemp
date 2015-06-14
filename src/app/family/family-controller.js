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

angular.module('familyModule')
	.controller('FamilyController', FamilyController);

function FamilyController($scope, Kids, $state, CurrentUser, Family) {
	
	$scope.kids = [];
	$scope.contacts = [];

	$scope.addContact = function(){
		$scope.contacts.push({
			name: '',
			phone: '',
			email: '',
			relationship: ''
		})
	}

	$scope.addKid = function(){
		$scope.kids.push({
			name: '',
			desc: '',
			family: '',
			avatar: 'default image'
		})
	}

	//todo : prepare that in case of more than one kid
	$scope.createFamily = function(){
		Family.create($scope.contacts, $scope.kids[0]).then(function(data){
			console.log(data)
		})
	}

	$scope.addContact();
	$scope.addKid();

}

FamilyController.$inject = [
	'$scope',
	'Kids',
	'$state',
	'CurrentUser',
	'Family'
]



