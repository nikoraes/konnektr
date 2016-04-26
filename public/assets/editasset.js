angular.module('konnektr.assets.editasset', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('editasset', {
		      url: "/assets/edit",
		      templateUrl: "assets/editasset.html",
		      controller: 'EditAssetCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Edit Asset'; }
		      }
		    });
		}])

	.controller('EditAssetCtrl', ['$scope', '$state', 'couch',
		function ($scope, $state, $http, couch) {
			$scope.asset = {
				_id: 'test-12345',
				name: 'Test',
				categories: []
			};		


    	
		}]) 
;	
	
	
