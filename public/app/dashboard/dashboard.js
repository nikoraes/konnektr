angular.module('konnektr.dashboard', [])
		
	.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	    .state('dashboard', {
	      url: "/dashboard",
	      templateUrl: "app/dashboard/dashboard.html",
	      resolve: {
	      	$title: function() { return 'Dashboard'; }
	      }
	    });
	});	
