angular.module('konnektr.assets.edit', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('assets.edit', {
		      url: "/assets/edit",
		      templateUrl: "assets/edit/edit.html",
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
				category: 'category'
			};		


    	
		}]) 
;	
	
	
