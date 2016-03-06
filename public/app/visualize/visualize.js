angular.module('konnektr.visualize', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('visualize', {
		      url: "/visualize",
		      templateUrl: "app/visualize/visualize.html",
		      data: {
			      requiresLogin: true
			    },
		      resolve: {
		      	$title: function() { return 'Visualize'; }
		      }
		    });
		}])
;	
