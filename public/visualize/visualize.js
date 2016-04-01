angular.module('konnektr.visualize', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('visualize', {
		      url: "/visualize",
		      templateUrl: "visualize/visualize.html",
			   	authenticate: true,
		      resolve: {
		      	$title: function() { return 'Visualize'; }
		      }
		    });
		}])
;	
