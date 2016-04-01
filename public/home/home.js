angular.module('konnektr.home', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('home', {
		      url: "/home",
		      templateUrl: "home/home.html",
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Home'; }
		      }
		    });
		}])
;	
