(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.controller('AssetEditController', AssetEditController);	
		
	AssetEditController.$inject = 	['asset'];
	function AssetEditController(asset) {	
		var vm = this;			
		vm.asset = asset;	
		vm.assetTypes = [
			{ title: 'Construction entity'},
			{ title: 'Space'},
			{ title: 'Element'},
			{ title: 'Product'}				
		];
	}

})();