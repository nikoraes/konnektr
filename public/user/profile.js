angular.module('konnektr.user.profile', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('profile', {
		      url: "/profile",
		      templateUrl: "user/profile.html",
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Profile'; }
		      }
		    });
		}])

;	
	
	
