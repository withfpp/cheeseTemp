'use strict';

/**
 * @ngdoc function
 * @name SignupController
 * @module triAngularAuthentication
 * @kind function
 *
 * @description
 *
 * Handles sending of signup info to api and response
 */
angular.module('triAngularAuthentication')
.controller('SignupController', 
    function ($scope, $state, $mdToast, $http, $filter, API_CONFIG, Auth, $stateParams) {
    // create blank user variable for login form
    $scope.user = {
        password:'',
        confirm:'',
        email: ''
    };
    $scope.params = $stateParams;
    $scope.error = '';
    var Firebase = Auth.Firebase;

    $scope.signupClick = signUp;

    init();


    function init(){
        $scope.user.email = $scope.params.email;
    }

    function signUp(){
        if($scope.user.password === $scope.user.confirm){
            console.log(Firebase)
            Firebase.createUser({
                email    : $scope.user.email,
                password : $scope.user.password
            }, function(error, userData) {
                if (error) {
                    console.log(error)
                    $scope.error = 'Sorry, create user failed, please try again later.'
                } else {
            console.log(Firebase)

                    Firebase.child('invitations').child($scope.params.invitation)
                        .once('value',function(snapshot){
                        var invitation = snapshot.val();
                        var newUser = {
                            email: $scope.user.email,
                            familyKey: invitation.familyKey,
                            userOrgId: invitation.userOrgId
                        };
            console.log(Firebase)

                        Firebase.child('users').child(userData.uid).set(newUser, function(){
                            Firebase.authWithPassword({
                                email: $scope.user.email,
                                password: $scope.user.password
                            }, function(error, authData){
                                if (error) {
                                } else {

                                    //temporary, send parents to general dashboard
                                    alert('success')
                                    $state.go('admin-panel.default.dashboard-general', {userId: authData.auth.uid});
                                }
                            });
                        });
                    });

                }
            });
        }else{
            $scope.error = 'Password and Confirm password must be the same.';
        }
    }




    // use later when we replace backend
    // 
    // $scope.signupClick = function() {
    //     $http({
    //         method: 'POST',
    //         url: API_CONFIG.url + 'signup',
    //         data: $scope.user
    //     }).
    //     success(function(data) {
    //         $mdToast.show(
    //             $mdToast.simple()
    //             .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + data.email)
    //             .position('bottom right')
    //             .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
    //             .highlightAction(true)
    //             .hideDelay(0)
    //         ).then(function() {
    //             $state.go('public.auth.login');
    //         });
    //     }).
    //     error(function() {
    //         $mdToast.show(
    //             $mdToast.simple()
    //             .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
    //             .position('bottom right')
    //             .hideDelay(5000)
    //         );
    //     });
    // };
});