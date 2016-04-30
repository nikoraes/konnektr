angular.module('konnektr.assets.editasset', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('editasset', {
		      url: "/assets/{asset_id}",
		      templateUrl: "assets/editasset.html",
		      controller: 'EditAssetCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Edit Asset'; }
		      }
		    });
		}])

	.controller('EditAssetCtrl', ['$scope', '$stateParams', 'couch',
		function ($scope, $stateParams, couch) {

			// TODO insert in resolve, to remove error from chips

			$scope.asset = {
				_id: "",
				name: "",
				categories: []
			};
			
			$scope.asset = [];

			$scope.db = couch.getDB();

			$scope.asset = $scope.db.getDoc($stateParams.asset_id);

    	
		}]) 
;	
	
	
