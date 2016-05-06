(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.config(AssetsRoute);	
	
	AssetsRoute.$inject = ['$stateProvider'];
	function AssetsRoute($stateProvider) {
	  $stateProvider
		  .state('assets', {
		    url: "/assets",
		    templateUrl: "assets/assets.html",
		    controller: 'AssetsController',
		    controllerAs: 'vm',
		    authenticate: true,
		    resolve: {
		    	$title: function() { return 'Assets'; }
	      }
	    });
	}

})();