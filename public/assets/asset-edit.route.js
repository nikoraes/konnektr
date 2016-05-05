(function() {
	'use strict';

	angular.module('konnektr.assets')		
		.config(AssetEditRoute);	
	
	AssetEditRoute.$inject = ['$stateProvider'];
	function AssetEditRoute($stateProvider) {
	  $stateProvider
	    .state('asset-edit', {
	      url: "/asset/{assetId}",
	      templateUrl: "assets/asset.html",
	      controller: 'AssetEditController',
	      controllerAs: 'vm',
	      authenticate: true,
	      resolve: {
	      	$title: function() { return 'Edit asset'; },
	      	asset: getAssetDoc
	      }
	    });
	}
	
	getAssetDoc.$inject = ['$stateParams', 'couch'];
	function getAssetDoc($stateParams, couch) {
		var assetDoc = couch.db.newDoc();		  		      		
		return assetDoc.load($stateParams.assetId)
			.then(function(){
				return assetDoc;
			});	
	}

})();