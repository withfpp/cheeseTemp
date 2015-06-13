angular.module('cheeseService')
	.service('CurrentUser', CurrentUser);

function CurrentUser($q, $state, Auth){

	var Firebase = Auth.Firebase;
	var authData = Firebase.getAuth();
	CurrentUser.userId;

	if(authData) {
		CurrentUser.userId = authData.uid;
	}

	Firebase.firebase.onAuth(function() {
		CurrentUser.userId = Firebase.getAuth() ? Firebase.getAuth().uid : false;
	});


	return {
		userId : CurrentUser.userId
	}

}	

CurrentUser.$inject = [
	'$q', '$state', 'Auth'
]