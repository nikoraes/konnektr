angular.module('konnektr.explore', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('explore', {
		      url: "/explore",
		      templateUrl: "explore/explore.html",
		      /**controller: 'ExploreCtrl',
		      data: {
			      authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
			    },**/
		      resolve: {
		      	$title: function() { return 'Explore'; }
		      }
		    });
		}])
	/**	
  .controller('ExploreCtrl', ['$scope',
		function ($scope) {
		  $scope.testdoc = $scope.db.getDoc("nikoraes-openhab-00000");
		}])		
		**/
		
		
;	
