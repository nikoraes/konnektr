angular.module('konnektr.user.register', [])
		
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		  $stateProvider
		    .state('register', {
		      url: "/register",
		      templateUrl: "user/register/register.html",
		      /**controller: 'RegisterCtrl',**/
		      resolve: {
		      	$title: function() { return 'Register'; }
		      }
		    });
		}])



;	
	
	
