angular.module('konnektr.dashboard', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('dashboard', {
		      url: "/dashboard",
		      templateUrl: "app/dashboard/dashboard.html",
		      /**controller: 'DashboardCtrl', **/
		      resolve: {
		      	$title: function() { return 'Dashboard'; }
		      }
		    });
		}])

/**
  .controller('DashboardCtrl', ['$scope', 'store', 'jwtHelper',
		function ($scope, store, jwtHelper) {
		  $scope.jwt = store.get('jwt');
		  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
		}])
**/		
	
	
;	
	
	
