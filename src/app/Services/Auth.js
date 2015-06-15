angular.module('cheeseService')
	.service('Auth', Auth);

function Auth($q, $state){
	var Auth = new Firebase("https://cheechetimes.firebaseio.com/");
	var _$q = $q;

	/**
	 * [Login description]
	 * login promise
	 * @param {[string]} email
	 * @param {[string]} password
	 */
	function Login(email, password){
		var deferred = _$q.defer();
		Auth.authWithPassword({
		  email: email,
		  password: password
		}, function(error, authData)  {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				deferred.resolve(authData)
				//redirect with login Id as a param
			}
		})
		return deferred.promise;
	}


	return {
		login : Login,
		Firebase: Auth
	}



}	
Auth
Auth.$inject = [
	'$q', '$state'
]