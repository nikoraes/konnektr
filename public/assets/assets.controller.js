(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.controller('AssetsController', AssetsController);	
		
	AssetsController.$inject = 	['$mdDialog', 'couch'];
	function AssetsController($mdDialog, couch) {	
		var vm = this;
		vm.selected = [];
		vm.getAssets = getAssets;
		vm.confirmDelete = confirmDelete;
			
	
		getAssets();
		function getAssets() {
			couch.db.query("konnektr", "assets", { include_docs: true });
		}	

		function confirmDelete(ev, asset) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
//	    			.parent(angular.element(document.body))
	          .textContent('Delete asset ' + asset.doc.name + '?')
	          .targetEvent(ev)
	          .ok('Delete')
	          .cancel('Cancel');
	    $mdDialog.show(confirm)
		    .then(function() {
// TODO Change getDoc in cornercouch instead		    	
		    	return couch.getAssetDoc(asset.doc._id)
		    		.then(function(assetDoc) {
		    			return assetDoc.remove();
		    		});
		    })
		    .then(function() {getAssets();})
		    ;
	  }


	}






})();