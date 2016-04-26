angular.module('konnektr.databases.databaselist', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('databaselist', {
		      url: "/databases/list",
		      templateUrl: "databases/databaselist.html",
		      controller: 'DBListCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Database list'; }
		      }
		    });
		}])

	.controller('DBListCtrl', ['$scope', '$state', 'couch',
		function ($scope, $state, couch) {
			
			$scope.dbname = couch.getDBname();
			
 			$scope.setdb = function() {
				couch.setDB($scope.dbname);
			}; 			

    	
		}]) 
;	
	
	