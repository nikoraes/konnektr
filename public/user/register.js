angular.module('konnektr.user.register', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('register', {
		      url: "/register",
		      templateUrl: "user/register.html",
		      controller: 'RegisterCtrl',
		      resolve: {
		      	$title: function() { return 'Register'; }
		      }
		    });
		}])

	.controller('RegisterCtrl', ['$scope', '$state', 'auth',
		function ($scope, $state, auth) {
			$scope.credentials = {
				username: '',
				password: ''
			};
			
			$scope.error = "";

			$scope.register = function() {
				auth.register($scope.credentials)
					.then(function(response) {
						$scope.response = response;
						$state.go('login');
					}, function(response) {
						$scope.error = response;
					});		
				
			};	
		
			
		}]) 
;	

	
	
