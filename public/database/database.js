angular.module('konnektr.database.database', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('databaselist', {
		      url: "/database",
		      templateUrl: "database/database.html",
		      controller: 'DatabaseCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Database list'; }
		      }
		    });
		}])

	.controller('DatabaseCtrl', ['$scope', '$state', '$mdDialog', 'couch',
		function ($scope, $state, $mdDialog, couch) {
			
			$scope.dbname = couch.getDBname();

 			$scope.setdb = function() {
				couch.setDB($scope.dbname);
			}; 	
			
 			$scope.setdbdialog = function() {
				couch.setDB($scope.dbname);
				$mdDialog.hide();
			}; 			

 			$scope.canceldialog = function() {
				$mdDialog.hide();
			}; 	

    	
		}]) 
;	
	
	