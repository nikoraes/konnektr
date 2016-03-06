angular.module('konnektr.user.login', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('login', {
		      url: "/login",
		      templateUrl: "app/user/login/login.html",
		      controller: 'LoginCtrl',
		      resolve: {
		      	$title: function() { return 'Login'; }
		      }
		    });
		}])

  .controller('LoginCtrl', ['$scope', 'cornercouch',
		function ($scope, cornercouch) {
		  $scope.user = {};
		  
			$scope.server = cornercouch("https://7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com", "GET");
			$scope.server.session();
			$scope.konnektrdata = $scope.server.getDB('konnektr-data');
			
			$scope.submitLogin = function() {
				$scope.server.login($scope.user.username, $scope.user.password)
					.success( function() {
	          $scope.user.username = $scope.user.password = '';
	          $scope.showInfo = true;
	          $scope.server.getInfo();
	          $scope.konnektrdata.getInfo();
	          $scope.testdoc = $scope.konnektrdata.getDoc("nikoraes-openhab-00000");
					});
	    };		    
		}])
			
;	
	
	
