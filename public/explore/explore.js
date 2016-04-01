angular.module('konnektr.explore', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
		    .state('explore', {
		      url: "/explore",
		      templateUrl: "explore/explore.html",
		      controller: 'ExploreCtrl', 
			    authenticate: true,
		      resolve: {
		      	$title: function() { return 'Explore'; }
		      }
		    });
		}])
	
  .controller('ExploreCtrl', ['$scope',
		function ($scope) {

		}])		
		
		
		
;	
