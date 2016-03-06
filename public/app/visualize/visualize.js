angular.module('konnektr.visualize', [])
		
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
	    .state('visualize', {
	      url: "/visualize",
	      templateUrl: "app/visualize/visualize.html",
	      resolve: {
	      	$title: function() { return 'Visualize'; }
	      }
	    });
	});	
