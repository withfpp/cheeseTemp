angular.module('cheeseService')
	.service('Kids', Kids)

function Kids($q, Auth){
	var Firebase = Auth.Firebase;


	// TODO : search by kidname is not good.
	// must be unique key...

	function findOneKid(userId, kidName){
		var deferred = $q.defer();
		
		Firebase
			.child('users')
			.child(userId + '/kids')
			.orderByChild('name')
			.equalTo(kidName)
			.on('value', function(snapshot) {
				var val = snapshot.val();
				var kidInfo = _.toArray(val)[0];
				var kidKey = Object.keys(val)[0];
				
				var kid = {
					kidInfo: kidInfo,
					kidKey: kidKey
				}

				deferred.resolve(kid);
			})

		return deferred.promise;
	
	}

	function findFamilyByKey(userId, familyKey){
		var deferred = $q.defer();

		Firebase
			.child('users')
			.child(userId + '/families')
			.on('value', function(snapshot) {
				snapshot.forEach(function(childSnapshot){
					var famKey = childSnapshot.key();
					var famValue = childSnapshot.val();

					if (famKey === familyKey){
						deferred.resolve(famValue)
					}

				})
			})

		return deferred.promise;	
	}

	function updateContactsByFamilyKey(userId, famKey, data){
		var deferred = $q.defer();

		Firebase.child('users')
			.child(userId)
			.child('families/' + famKey)
			.update({
				contacts: data
			}, function() {
				deferred.resolve(data);
			})

		return deferred.promise;	

	}


	function updateKidByKidKey(userId, kidKey, data){
		var deferred = $q.defer();

		Firebase
			.child('users')
			.child(userId + '/kids/' + kidKey)
			.update(data, function(){
				deferred.resolve(data);
			})

		return deferred.promise;	

	}

	return {
		findOneKid: findOneKid,
		findFamilyByKey: findFamilyByKey,
		updateContactsByFamilyKey: updateContactsByFamilyKey,
		updateKidByKidKey: updateKidByKidKey
	}

}

Kids.$inject = ['$q' , 'Auth']



	

	



	