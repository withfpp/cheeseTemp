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

angular.module('kidsModule')
	.controller('KidsController', KidsController);

function KidsController($scope, Kids, $state, CurrentUser) {
		
	$scope.kid = {}
	$scope.kid.name = $state.params.kidId;
	$scope.contacts = []

	// set kid info
	async.series([
		getKidInfo,
		getFamilyInfo
	])

	function getKidInfo(cb){	
		Kids.findOneKid(CurrentUser.userId, $scope.kid.name)
			.then(function(data){
				angular.extend($scope.kid, data.kidInfo)
				$scope.kid.kidKey = data.kidKey;
				cb()
			})
	}


	function getFamilyInfo(){
		Kids.findFamilyByKey(CurrentUser.userId, $scope.kid.family)
			.then(function(data){
				$scope.contacts = data.contacts;
				console.log($scope.contacts)
			})	
	}	


	$scope.updateSettingsClick = function(){
		async.parallel([
			updateFamilyInfo,
			updateKidInfo
		], updateSuccess)
	}


	function updateFamilyInfo(cb){
		var contacts = beforeUpdateFamily($scope.contacts)
		Kids.updateContactsByFamilyKey(
			CurrentUser.userId, //userID
			$scope.kid.family, 	//familyKey
			contacts // preprocessed family info data
			)
			.then(cb)
	}

	function updateKidInfo(){
		Kids.updateKidByKidKey(
			self.CurrentUser.userId, 
			$scope.kid.kidKey, 
			$scope.kid)
	}

	function updateSuccess(){
		alert('success')
	}


	function beforeUpdateFamily(contacts){
		return contacts.map(function(contact){
			delete contact.$$hashKey
			return contact
		})
	}


}

KidsController.$inject = [
	'$scope',
	'Kids',
	'$state',
	'CurrentUser'
]



