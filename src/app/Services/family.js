angular.module('cheeseService')
	.service('Family', Family)

function Family($q, Auth, CurrentUser){
	var Firebase = Auth.Firebase;

	function create(contacts, kid){
		var dfd = $q.defer();
		var data = createKid(createFamily(contacts), kid)
		dfd.resolve(data)
		return dfd.promise;
	}


	function createFamily(contacts){
		var familyRef = Firebase.child('users')
			.child(CurrentUser.userId)
			.child('families').push({
	        contacts: contacts.map(hashRemover)
	    });

	  return familyRef;  
	}

	function createKid(familyRef, kid){
		kid.family = familyRef.key()
		var kid = hashRemover(kid);
		
		var kidRef = Firebase.child('users')
			.child(this.CurrentUser.userId)
			.child('kids').push(kid);
		var kidId = kidRef.key();

		// inject kid key into family
		familyRef.child('kids').push(kidId);	
		return kid;
	}

	function hashRemover(obj){
		if(obj.hasOwnProperty('$$hashKey')){
			delete obj.$$hashKey
			return obj
		}
		return obj;
	}

	
	return {
		create: create
	}

}

Family.$inject = ['$q' , 'Auth', 'CurrentUser']



	

	



	