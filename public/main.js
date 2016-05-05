angular.module('konnektr.main', [])

	/** Theme **/
	.config(['$mdThemingProvider', function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('grey', {
      'default': '900'
    })
	    .accentPalette('red', {
      'default': 'A700'
    });
	}])


	/** Router **/	
	.config(['$urlRouterProvider',
		function($urlRouterProvider) {
		  $urlRouterProvider.otherwise("/dashboard");
		}])

	.run(['$rootScope', '$state', 'auth',
		function ($rootScope, $state, auth) {
			$rootScope.$state = $state;
		  $rootScope.$on('$stateChangeStart', function (event, next) {
		    if (next.authenticate && !auth.isLoggedIn()){
		      event.preventDefault();
		      $state.go('login');
		    }    
	  	});
		}])		


	/** Interceptor **/	
	.factory('authInterceptor',['$q', '$state', 
		function($q, $state){
	    return {
				response: function(response){
					if (response.status === 401) {
						console.log("Response 401");
					}
					return response || $q.when(response);
	       },
				responseError: function(rejection) {
					if (rejection.status === 401) {
						console.log("Response Error 401",rejection);
			      $state.go('login');
					}
					return $q.reject(rejection);
				}
	    }
		}])
/**
	.config(['$httpProvider',
		function($httpProvider) {
	    $httpProvider.interceptors.push('authInterceptor');
		}])
**/


  .controller('MainCtrl', ['$scope', '$mdSidenav',
		function ($scope, $mdSidenav) {
			/** Toggle Sidenav **/
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};  
		}])
;