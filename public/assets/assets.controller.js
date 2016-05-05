(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.controller('AssetsController', AssetsController);	
		
	AssetsController.$inject = 	['couch'];
	function AssetsController(couch) {	
		var vm = this;
		vm.selected = [];
		vm.getAssets = function () {
			couch.db.query("konnektr", "assets", { include_docs: true });
		}	
		vm.getAssets();
	}

})();