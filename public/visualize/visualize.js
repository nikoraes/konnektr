angular.module('konnektr.visualize', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('visualize', {
		      url: "/visualize",
		      templateUrl: "visualize/visualize.html",
		      data: {
			      authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
			    },
		      resolve: {
		      	$title: function() { return 'Visualize'; }
		      }
		    });
		}])
;	
