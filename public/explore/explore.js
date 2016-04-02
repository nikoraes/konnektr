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
	
  .controller('ExploreCtrl', ['$scope', 'couch',
		function ($scope, couch) {
			$scope.db = couch.getDB();
			$scope.db.query("konnektr-api", "assets", { include_docs: true });
		}])		
		
		
		
;	
