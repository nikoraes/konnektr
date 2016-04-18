angular.module('konnektr.user.login', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('login', {
		      url: "/login",
		      templateUrl: "user/login/login.html",
		      controller: "LoginCtrl",
		      resolve: {
		      	$title: function() { return 'Login'; }
		      }
		    });
			}])

	.controller('LoginCtrl', ['$scope', '$state', 'auth', 'couch',
		function ($scope, $state, auth, couch) {
			$scope.credentials = {
				username: '',
				password: ''
			};

			$scope.login = function() {
				auth.logIn($scope.credentials)
					.then(function(response) {
							$scope.response = response;
							$state.go('createdb');
						}, function(response) {
							$scope.error = response;
						});;				
			};

			
		}]) 

;	
	
	
