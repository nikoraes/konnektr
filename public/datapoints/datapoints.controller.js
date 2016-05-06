(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.controller('DatapointsController', DatapointsController);	
		
	DatapointsController.$inject = 	['couch'];
	function DatapointsController(couch) {	
		var vm = this;
		vm.selected = [];
		vm.getDatapoints = function () {
			couch.db.query("konnektr", "datapoints", { include_docs: true });
		};	
		vm.getDatapoints();
	}

})();