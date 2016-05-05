(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.config(AssetCreateRoute);	
	
	AssetCreateRoute.$inject = ['$stateProvider'];
	function AssetCreateRoute($stateProvider) {
	  $stateProvider
	    .state('asset-create', {
	      url: "/asset/create",
	      templateUrl: "assets/asset.html",
	      controller: 'AssetCreateController',
	      controllerAs: 'vm',
	      authenticate: true,
	      resolve: {
	      	$title: function() { return 'Create asset'; },
	      	asset: newAssetDoc
	      }
	    });
	}
	
	newAssetDoc.$inject = ['couch'];
	function newAssetDoc(couch) {
		var assetDoc = couch.db.newDoc();	
		assetDoc.name = "";
		assetDoc.type = "asset";
		assetDoc.location = "";
		return assetDoc;      		
	}

})();