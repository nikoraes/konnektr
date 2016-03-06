angular.module('konnektr.explore', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('explore', {
		      url: "/explore",
		      templateUrl: "app/explore/explore.html",
		      controller: 'ExploreCtrl',
		      data: {
			      requiresLogin: true
			    },
		      resolve: {
		      	$title: function() { return 'Explore'; }
		      }
		    });
		}])
		
  .controller('ExploreCtrl', ['$scope',
		function ($scope) {
		  $scope.testdoc = $scope.db.getDoc("nikoraes-openhab-00000");
		}])		
		
		
		
;	
