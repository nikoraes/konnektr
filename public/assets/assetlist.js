angular.module('konnektr.assets.assetlist', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('assetlist', {
		      url: "/assets",
		      templateUrl: "assets/assetlist.html",
		      controller: 'AssetListCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Assets'; }
		      }
		    });
		}])

	.controller('AssetListCtrl', ['$scope', '$state', 'couch',
		function ($scope, $state, couch) {

			$scope.selected = [];

			$scope.db = couch.getDB();
			
			$scope.getAssets = function () {
				$scope.db.query("konnektr", "assets", { include_docs: true });			
			};
			
			$scope.getAssets();
			
		}]) 
;	
	
