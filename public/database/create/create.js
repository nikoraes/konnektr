angular.module('konnektr.database.create', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('database.create', {
		      url: "/database/create",
		      templateUrl: "databse/create/create.html",
		      controller: 'CreateDBCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Create Database'; }
		      }
		    });
		}])

	.controller('CreateDBCtrl', ['$scope', '$state', '$http', 'couch',
		function ($scope, $state, $http, couch) {
			$scope.createdbdata = {
				dbname: ''
			};		

			$scope.setasdefaultdb = false;

    	$scope.createdb = function() {    		
	      return $http
	        .post('/api/createdb', $scope.createdbdata)
	        .then(function (response) {
	        	console.log(response);
			      return $http
			        .post('/api/setupdb', $scope.createdbdata)
			        .then(function (response) {
			        	console.log(response);
		        	});	        	
	        	});
    	};

 			$scope.setdb = function() {
				couch.setDB($scope.dbname);
			};   	
    	
		}]) 
;	
	
	
