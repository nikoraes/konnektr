(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.config(DatapointEditRoute);	
	
	DatapointEditRoute.$inject = ['$stateProvider'];
	function DatapointEditRoute($stateProvider) {
	  $stateProvider
	    .state('datapoint-edit', {
	      url: "/datapoint/{datapointId}",
	      templateUrl: "datapoints/datapoint.html",
	      controller: 'DatapointEditController',
	      controllerAs: 'vm',
	      authenticate: true,
	      resolve: {
	      	$title: function() { return 'Edit datapoint'; },
	      	datapoint: getDatapointDoc
	      }
	    });
	}
	
	getDatapointDoc.$inject = ['$stateParams', 'couch'];
	function getDatapointDoc($stateParams, couch) {
		var datapointDoc = couch.db.newDoc();		  		      		
		return datapointDoc.load($stateParams.datapointId)
			.then(function(){
				return datapointDoc;
			});	
	}

})();