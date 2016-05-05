(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.controller('DatapointEditController', DatapointEditController);	
		
	DatapointEditController.$inject = 	['datapoint'];
	function DatapointEditController(datapoint) {	
		var vm = this;			
		vm.datapoint = datapoint;	
		vm.properties = [
			{ title: 'Power'},
			{ title: 'Temperature'}	
		];
		vm.units = [
			{	title: 'kW' },
			{	title: '°C' }
		];
	}

})();