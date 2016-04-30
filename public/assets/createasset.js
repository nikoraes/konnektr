angular.module('konnektr.assets.createasset', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('createasset', {
		      url: "/assets/create",
		      templateUrl: "assets/asset.html",
		      controller: 'CreateAssetCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Create Asset'; },
		      	asset: function(couch) {
		      		var assetDoc = couch.db.newDoc();	
		      		assetDoc.name = "";
		      		assetDoc.type = "asset";
		      		assetDoc.categories = [];
		      		assetDoc.location = "";
		      		return assetDoc;      		
		      	}
		      }
		    });
		}])

	.controller('CreateAssetCtrl', ['$scope', 'asset', 
		function ($scope, asset) {
			$scope.asset = asset;			

			$scope.$watch('asset.name', function() {
			 	$scope.date = new Date();	
			 	$scope.asset._id = $scope.asset.name.toLowerCase() + "-" + 	$scope.date.getTime().toString(36).substr(2, 5);
			});   	
		}]) 
;	
	
	