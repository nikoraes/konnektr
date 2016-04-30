angular.module('konnektr.database.createdb', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('createdb', {
		      url: "/database/createdb",
		      templateUrl: "database/createdb.html",
		      controller: 'CreateDBCtrl',
		      authenticate: true,
		      resolve: {
		      	$title: function() { return 'Create database'; }
		      }
		    });
		}])

	.controller('CreateDBCtrl', ['$scope', '$state', '$http', '$timeout', 'couch', 'session',
		function ($scope, $state, $http, $timeout, couch, session) {
				
			$scope.createdbdata = {
				dbname: '',
				username: session.getUserName()
			};		

			$scope.setasdefaultdb = false;
			$scope.response = "";

    	$scope.setupdb = function() {    		
	      return $http
	        .post('/api/setupdb', $scope.createdbdata)
	        .then(
	        	function (response) {
		        	console.log(response);      
		        	couch.server.userDoc.databases.push($scope.createdbdata.dbname);
		        	if ($scope.setasdefaultdb) couch.server.userDoc.defaultdatabase = $scope.createdbdata.dbname;      	
		   				couch.server.userDoc.save();
		        	couch.setDB($scope.createdbdata.dbname);	        	
	        	}, function (err) {
		        	console.log(err);     
		        	$scope.error = err;	  
		        	$scope.createDatabaseForm.email.$setValidity('server', false);
							$scope.createDatabaseForm.password.$setValidity('server', false);
	        	});
    	};

  	
    	
		}]) 
;	
	
	
