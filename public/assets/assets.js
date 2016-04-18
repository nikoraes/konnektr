angular.module('konnektr.assets', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('assets', {
		      url: "/assets",
		      templateUrl: "assets/assets.html",
		      controller: 'AssetCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Assets'; }
		      }
		    });
		}])

	.controller('AssetCtrl', ['$scope', '$state', 'couch',
		function ($scope, $state, $http, couch) {
			$scope.selected = [];
			
			$scope.db = couch.getDB();
			
			$scope.getAssets = function () {
				$scope.db.query("konnektr-api", "assets", { include_docs: true });			
			};
		}]) 
;	
	
	
