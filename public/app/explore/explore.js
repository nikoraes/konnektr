angular.module('konnektr.explore', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('explore', {
		      url: "/explore",
		      templateUrl: "app/explore/explore.html",
		      data: {
			      requiresLogin: true
			    },
		      resolve: {
		      	$title: function() { return 'Explore'; }
		      }
		    });
		}])
;	
