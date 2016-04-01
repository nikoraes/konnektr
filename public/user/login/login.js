angular.module('konnektr.user.login', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('login', {
		      url: "/login",
		      templateUrl: "user/login/login.html",
		      controller: 'LoginCtrl',
		      resolve: {
		      	$title: function() { return 'Login'; }
		      }
		    });
			}])

	.controller('LoginController', ['$scope', 'auth', 
		function ($scope, auth) {
			$scope.credentials = {
				username: '',
				password: ''
			};
			$scope.login = function (credentials) {
				auth.logIn(credentials);
			};
		}]) 


;	
	
	
