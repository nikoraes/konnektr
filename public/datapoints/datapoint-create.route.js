(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.config(DatapointCreateRoute);	
	
	DatapointCreateRoute.$inject = ['$stateProvider'];
	function DatapointCreateRoute($stateProvider) {
	  $stateProvider
	    .state('datapoint-create', {
	      url: "/datapoint/create",
	      templateUrl: "datapoints/datapoint.html",
	      controller: 'DatapointCreateController',
	      controllerAs: 'vm',
	      authenticate: true,
	      resolve: {
	      	$title: function() { return 'Create datapoint'; },
	      	datapoint: newDatapointDoc
	      }
	    });
	}
	
	newDatapointDoc.$inject = ['couch'];
	function newDatapointDoc(couch) {
		var datapointDoc = couch.db.newDoc();	
		datapointDoc.name = "";
		datapointDoc.type = "datapoint";
		datapointDoc.location = "";
		return datapointDoc;      		
	}

})();