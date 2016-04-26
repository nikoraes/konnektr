angular.module('konnektr.user.login', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('login', {
		      url: "/login",
		      templateUrl: "user/login.html",
		      controller: "LoginCtrl",
		      resolve: {
		      	$title: function() { return 'Login'; }
		      }
		    });
			}])

	.controller('LoginCtrl', ['$scope', '$state', '$timeout', 'auth', 'session', 'couch',
		function ($scope, $state, $timeout, auth, session, couch) {
			$scope.credentials = {
				username: '',
				password: ''
			};


			$scope.login = function() {
				auth.logIn($scope.credentials)
					.then(function(response) {
						// Timeout because getUserDoc doesn't seem to return a proper promise
						$timeout(function() {}, 800).then(function() {
							if (couch.server.userDoc.defaultdatabase) {						
								couch.setDB(couch.server.userDoc.defaultdatabase);
								$state.go('dashboard');
							} else {
								$state.go('createdb');
							}	
						});

					}, function(err) {
						$scope.error = err;
						$scope.loginForm.email.$setValidity('server', false);
						$scope.loginForm.password.$setValidity('server', false);
					});
			};




			
		}]) 

;	
	
	
