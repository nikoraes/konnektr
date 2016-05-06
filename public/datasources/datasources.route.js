(function() {
	'use strict';

	angular.module('konnektr.datasources')		
		.config(DatasourcesRoute);	
	
	DatasourcesRoute.$inject = ['$stateProvider'];
	function DatasourcesRoute($stateProvider) {
	  $stateProvider
		  .state('datasources', {
		    url: "/datasources",
		    templateUrl: "datasources/datasources.html",
//		    controller: 'DatasourcesController',
//		    controllerAs: 'vm',
		    authenticate: true,
		    resolve: {
		    	$title: function() { return 'Datasources'; }
	      }
	    });
	}

})();