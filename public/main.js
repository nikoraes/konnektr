angular.module('konnektr.main', [])

	/** Theme **/
	.config(['$mdThemingProvider', function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('grey')
	    .accentPalette('deep-orange');
	}])


	/** Authentication and session **/

	.service('auth', [ 'session', 'couch',
		function (session, couch) {
			this.isLoggedIn = function () {
				return session.getUserName() !== null;
			};
			this.logIn = function (credentials) {
				couch.server.login(credentials.username, credentials.password)
					.then(function (response) {
						session.create(couch.server.userCtx);
					});		
			};
			this.logOut = function () {
				couch.server.logout()
					.then(function (response) {
						session.destroy();
					});
    	};    	
		}])

	.service('session', function () {				
		this.getUserName = function () {
			return this.userName;
		};
		this.getUserRoles = function () {
			return this.userRoles;
		};			
	  this.create = function (userCtx) {
	    this.userName = userCtx.name;
	    this.userRoles = userCtx.roles;
	  };	  
	  this.destroy = function () {
	    this.userName = null;
	    this.userRoles = null;
	  };
	})

	.run(['$rootScope', 'auth', 'session',
		function ($rootScope, auth, session) {
	    $rootScope.auth = auth;
	    $rootScope.session = session;    
		}])


	/** Router **/	
	.config(['$urlRouterProvider',
		function($urlRouterProvider) {
		  $urlRouterProvider.otherwise("/");
		}])

	.run(['$rootScope', '$state', 'auth',
		function ($rootScope, $state, auth) {
		  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		    if (toState.authenticate && !auth.isLoggedIn()){
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

	/** Database **/
	.constant('COUCHDB', {
	  url: 'https://7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com',
	  method: 'GET'
	})

	.service('couch', [ 'cornercouch', 'COUCHDB', 
		function (cornercouch, COUCHDB) {		
			this.server = cornercouch(COUCHDB.url, COUCHDB.method);
			this.setDB = function (dbName) {
				this.dbName = dbName; 
				this.db = this.server.getDB(dbName);
			};
			this.getDB = function () {
				return this.db;
			};
		}])







  .controller('MainCtrl', ['$scope', '$mdSidenav',
		function ($scope, $mdSidenav) {
			/** Toggle Sidenav **/
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};  
		}])
;