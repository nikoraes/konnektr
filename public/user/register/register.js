angular.module('konnektr.user.register', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('register', {
		      url: "/register",
		      templateUrl: "user/register/register.html",
		      controller: 'RegisterCtrl',
		      resolve: {
		      	$title: function() { return 'Register'; }
		      }
		    });
		}])

	.controller('RegisterCtrl', ['$scope', '$state', '$http', 'auth', 'couch',
		function ($scope, $state, $http, auth, couch) {
			$scope.credentials = {
				username: '',
				password: ''
			};

			$scope.register = function() {
				auth.register($scope.credentials)
					.then(function(response) {
						$scope.response = response;
					});		
				
				/**$state.go('dashboard');**/
			};	
			
			$scope.createdb = function () {
				$scope.createdbparams = {
					username: $scope.credentials.username,
					dbname: $scope.dbname
				};
	      return $http
	        .post('/api/createdb', $scope.createdbparams);  				
			};
			
			
		}]) 
;	

	
	
