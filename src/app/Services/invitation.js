angular.module('cheeseService')
	.service('Invitation', Invitation)

function Invitation($q, Auth, CurrentUser){
	var _Firebase = Auth.Firebase;
	var _CurrentUser = CurrentUser;

	function sendInvitation(familyKey){
		var invitation = {
			familyKey: familyKey,
        	userOrgId: _CurrentUser.userId,
        	isProcessed: false
		}

		_Firebase.child('invitations').push(invitation);
		
	}
	
	return {
		sendInvitation: sendInvitation
	}

}

Invitation.$inject = ['$q' , 'Auth', 'CurrentUser']



	

	



	