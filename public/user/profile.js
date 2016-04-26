angular.module('konnektr.user.profile', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('profile', {
		      url: "/profile",
		      templateUrl: "user/profile.html",
		      authenticate: true,
		      resolve: {
		      	$title: ['couch', function(couch) { return 'Profile:  ' + couch.server.userDoc.name; }]
		      }
		    });
		}])

;	
	
	
