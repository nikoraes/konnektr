angular.module('konnektr.explore', [])
		
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
	    .state('explore', {
	      url: "/explore",
	      templateUrl: "app/explore/explore.html",
	      resolve: {
	      	$title: function() { return 'Explore'; }
	      }
	    });
	});	
