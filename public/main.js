angular.module('konnektr.main', [])
	
	.config(['$urlRouterProvider',
		function($urlRouterProvider) {
		  $urlRouterProvider.otherwise("/home");
/**		  
		  jwtInterceptorProvider.tokenGetter = function(store) {
		    return store.get('jwt');
		  }		
		  $httpProvider.interceptors.push('jwtInterceptor');
**/
		}])

/**				
	.run(['$rootScope', '$state', 'store', 'jwtHelper',
		function($rootScope, $state, store, jwtHelper) {
		  $rootScope.$on('$stateChangeStart', function(e, to) {
		    if (to.data && to.data.requiresLogin) {
		      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
		        e.preventDefault();
		        $state.go('login');
		      }
		    }
		  });
		}])
**/
/**
	.run(function ($rootScope, AUTH_EVENTS, AuthService) {
	  $rootScope.$on('$stateChangeStart', function (event, next) {
	    var authorizedRoles = next.data.authorizedRoles;
	    if (!AuthService.isAuthorized(authorizedRoles)) {
	      event.preventDefault();
	      if (AuthService.isAuthenticated()) {
	        // user is not allowed
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	      } else {
	        // user is not logged in
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      }
	    }
	  });
	})
	
	.config(function ($httpProvider) {
	  $httpProvider.interceptors.push([
	    '$injector',
	    function ($injector) {
	      return $injector.get('AuthInterceptor');
	    }
	  ]);
	})

	.factory('AuthInterceptor', function ($rootScope, $q,
	                                      AUTH_EVENTS) {
	  return {
	    responseError: function (response) { 
	      $rootScope.$broadcast({
	        401: AUTH_EVENTS.notAuthenticated,
	        403: AUTH_EVENTS.notAuthorized,
	        419: AUTH_EVENTS.sessionTimeout,
	        440: AUTH_EVENTS.sessionTimeout
	      }[response.status], response);
	      return $q.reject(response);
	    }
	  };
	})

**/

/**

	.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
	  all: '*',
	  admin: 'admin',
	  editor: 'editor',
	  guest: 'guest'
	})

	.constant('COUCHDB', {
	  url: 'https://7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com',
	  method: 'GET'
	})





	.factory('AuthService', [ '$http', 'COUCHDB', 'Session', 'cornercouch',
		function ($http, COUCHDB, Session, cornercouch) {
		  var authService = {};
		  var server = cornercouch(COUCHDB.url, COUCHDB.method);
		 
		  authService.login = function (credentials) {
					server.login(credentials.username, credentials.password)
						.success( function(data) {
		          credentials.username = credentials.password = '';        
	            Session.create(server.userCtx);
	        		return server.userCtx;
						});
		  };
		 
		  authService.isAuthenticated = function () {
		    return !!Session.userName;
		  };
		 
		  authService.isAuthorized = function (authorizedRoles) {
		    if (!angular.isArray(authorizedRoles)) {
		      authorizedRoles = [authorizedRoles];
		    }
		    return (authService.isAuthenticated() &&
		      authorizedRoles.indexOf(Session.userRoles) !== -1);
		  };
		 
		  return authService;
		}])




	.service('Session', function () {
	  this.create = function (userCtx) {
	    this.userName = userCtx.name;
	    this.userRoles = userCtx.roles;
	  };
	  this.destroy = function () {
	    this.userName = null;
	    this.userRoles = null;
	  };
	})





**/
  .controller('MainCtrl', ['$scope', 'cornercouch', 'USER_ROLES', 'AuthService',
		function ($scope, cornercouch, USER_ROLES, AuthService) {
			
			/** Cloudant 
		  $scope.user = {};
		  
			$scope.server = cornercouch("https://7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com", "GET");
			$scope.db = $scope.server.getDB('konnektr-data');
			
			$scope.server.session()
				.success( function() {
	          $scope.server.getInfo();
	          $scope.db.getInfo();
					});			
			
			$scope.submitLogin = function() {
				$scope.server.login($scope.user.username, $scope.user.password)
					.success( function() {
	          $scope.user.username = $scope.user.password = '';
	          $scope.server.getInfo();
	          $scope.db.getInfo();
					});
	    };		 




		  $scope.currentUser = null;
		  $scope.userRoles = USER_ROLES;
		  $scope.isAuthorized = AuthService.isAuthorized;
		 
		  $scope.setCurrentUser = function (user) {
		    $scope.currentUser = user;
		  };


**/



	    /** Sidebar Toggle **/
	    var mobileView = 992;		
	    $scope.getWidth = function() {
	        return window.innerWidth;
	    };		
	    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
	        if (newValue >= mobileView) {
	            $scope.toggle = true;
	        } else {
	            $scope.toggle = false;
	        }
	    });		
	    $scope.toggleSidebar = function() {
	        $scope.toggle = !$scope.toggle;
	    };		
	    window.onresize = function() {
	        $scope.$apply();
	    };
		    
		    
		    
		    
		}])

;