angular.module('konnektr.trends', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('trends', {
		      url: "/trends",
		      templateUrl: "trends/trends.html",
			   	authenticate: true,
		      resolve: {
		      	$title: function() { return 'Trends'; }
		      }
		    });
		}])
;	
