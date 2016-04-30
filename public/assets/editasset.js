angular.module('konnektr.assets.editasset', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('editasset', {
		      url: "/assets/{asset_id}",
		      templateUrl: "assets/asset.html",
		      controller: 'EditAssetCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Edit Asset'; },
		      	asset: function($stateParams, couch) {
		      		var assetDoc = couch.db.newDoc();		  		      		
		      		return assetDoc.load($stateParams.asset_id)
		      			.then(function(){
			      			return assetDoc;
		      			});	      		
		      	}
		      }
		    });
		}])

	.controller('EditAssetCtrl', ['$scope', 'asset',
		function ($scope, asset) {
			$scope.asset = asset;
		}]) 
;	
	
	
