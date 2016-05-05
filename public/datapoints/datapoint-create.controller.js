(function() {
	'use strict';

	angular.module('konnektr.datapoints')		
		.controller('DatapointCreateController', DatapointCreateController);	
		
	DatapointCreateController.$inject = ['$scope', 'asset'];
	function DatapointCreateController($scope, asset) {	
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
		
		$scope.$watch('vm.datapoint.name', function() {
		 	vm.date = new Date();	
		 	vm.datapoint._id = vm.datapoint.name.toLowerCase() + "-" + 	vm.date.getTime().toString(36).substr(2, 5);
		}); 
	}

})();