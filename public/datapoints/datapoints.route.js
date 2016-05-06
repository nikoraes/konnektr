(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.config(DatapointsRoute);	
	
	DatapointsRoute.$inject = ['$stateProvider'];
	function DatapointsRoute($stateProvider) {
	  $stateProvider
		  .state('datapoints', {
		    url: "/datapoints",
		    templateUrl: "datapoints/datapoints.html",
		    controller: 'DatapointsController',
		    controllerAs: 'vm',
		    authenticate: true,
		    resolve: {
		    	$title: function() { return 'Datapoints'; }
	      }
	    });
	}

})();