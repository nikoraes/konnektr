angular.module('konnektr.dashboard', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('dashboard', {
		      url: "/dashboard",
		      templateUrl: "dashboard/dashboard.html",
		      controller: 'DashboardCtrl', 
		      resolve: {
		      	$title: function() { return 'Dashboard'; }
		      }
		    });
		}])


  .controller('DashboardCtrl', ['$scope', 
		function ($scope) {
		  $scope.mainserver = $scope.server;
		  $scope.maindb = $scope.db;
		}])	
	
;	
	
	
