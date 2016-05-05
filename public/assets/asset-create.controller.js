(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.controller('AssetCreateController', AssetCreateController);	
		
	AssetCreateController.$inject = ['$scope', 'asset'];
	function AssetCreateController($scope, asset) {	
		var vm = this;	
		vm.asset = asset;			
		vm.assetTypes = [
			{ title: 'Construction entity'},
			{ title: 'Space'},
			{ title: 'Element'},
			{ title: 'Product'}					
		];			
		
		$scope.$watch('vm.asset.name', function() {
		 	vm.date = new Date();	
		 	vm.asset._id = vm.asset.name.toLowerCase() + "-" + 	vm.date.getTime().toString(36).substr(2, 5);
		}); 
	}

})();