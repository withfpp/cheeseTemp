angular.module('cheeseService')
	.service('CurrentUser', CurrentUser);

function CurrentUser($q, $state, Auth){

	var Firebase = Auth.Firebase;
	var authData = Firebase.getAuth();
	CurrentUser.userId;
	if(authData) {
		CurrentUser.userId = authData.uid;
		CurrentUser.email = authData.password.email
	}


	Firebase.onAuth(function() {
		CurrentUser.userId = Firebase.getAuth() ? Firebase.getAuth().uid : false;
	});


	// get kid names belong to the teacher
	function getKids(){
		var dfd = $q.defer();
		Firebase.child('users')
			.child(CurrentUser.userId)
			.on('value', function(snapshot){
				var data = snapshot.val();
				CurrentUser.teacherName = data.name;
				CurrentUser.kids = data.kids;
				dfd.resolve({
					name: data.name,
					kids: data.kids
				})
		})
		return dfd.promise;
	}


	
	function logout(){
		CurrentUser.userId = null;
		localStorage["firebase:session::cheechetimes"] = null;
	}


	return {
		userId : CurrentUser.userId,
		logout : logout,
		email: CurrentUser.email,
		getKids: getKids
	}

}	

CurrentUser.$inject = [
	'$q', '$state', 'Auth'
]