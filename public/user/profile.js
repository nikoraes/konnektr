angular.module('konnektr.user.profile', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('profile', {
		      url: "/profile",
		      templateUrl: "user/profile.html",
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Profile'; }
		      }
		    });
		}])

	.controller('ProfileCtrl', ['$scope', '$mdDialog', 'couch',
		function ($scope, $mdDialog, couch) {

		$scope.dbdialog = function(ev) {
	    $mdDialog.show({
	    	controller: DatabaseCtrl,
	      templateUrl: 'database/database.dialog.html',
     		targetEvent: ev,
      	clickOutsideToClose:true
	    });
	  };

		$scope.dbname = couch.getDBname();
				
 		$scope.setdbdialog = function() {
			couch.setDB($scope.dbname);
			$mdDialog.hide();
		}; 			

 		$scope.canceldialog = function() {
			$mdDialog.hide();
		}; 	

	}]) 
;	
	

function DatabaseCtrl($scope, $mdDialog, couch) {
		$scope.dbname = couch.getDBname();
				
 		$scope.setdbdialog = function() {
			couch.setDB($scope.dbname);
			$mdDialog.hide();
		}; 			

 		$scope.canceldialog = function() {
			$mdDialog.hide();
		}; 		
};
