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

	.controller('AssetListCtrl', ['$scope', '$state', '$mdDialog', 'couch',
		function ($scope, $state, $mdDialog, couch) {

			$scope.selected = [];
			
			$scope.getAssets = function () {
				couch.db.query("konnektr", "assets", { include_docs: true });			
			};
			
			$scope.getAssets();



			
		}]) 
;	
	
