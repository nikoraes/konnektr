angular.module('konnektr.main', [])

	/** Theme **/
	.config(['$mdThemingProvider', function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('grey')
	    .accentPalette('deep-orange');
	}])


	/** Authentication and session **/

	.service('auth', [ '$http', '$state', 'session', 'couch',
		function ($http, $state, session, couch) {
			this.isLoggedIn = function () {
				return session.getUserName() !== null;
			};
			this.logIn = function (credentials) {
				return couch.server.login(credentials.username, credentials.password)
					.then(function (response) {
						session.create(couch.server.userCtx);
					});		
			};
			this.logOut = function () {
				session.destroy();
				couch.server.logout();
				couch.setDB(null);
				$state.go('login');
    	};  
    	this.register = function (credentials) {
	      return $http
	        .post('/api/register', credentials);    		
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
	    auth.logOut();
	    $rootScope.auth = auth;
	    $rootScope.session = session;    	    
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

	/** Database **/
	.constant('COUCHDB', {
	  url: 'https://9e901ac1-1c1c-4046-9c38-d4fbed11844c-bluemix.cloudant.com',
	  method: 'GET'
	})

	.service('couch', [ 'cornercouch', 'COUCHDB', 
		function (cornercouch, COUCHDB) {		
			this.server = cornercouch(COUCHDB.url, COUCHDB.method);
			
			this.setDB = function (dbName) {
				this.dbName = dbName; 
				if (dbName) {
					this.db = this.server.getDB(dbName);
				};
				return this.db;
			};
			
			this.getDB = function () {
				return this.db;
			};
			
			this.getDBname = function () {
				return this.dbName;
			};

			this.getUserDoc = function () {
				return this.server.getUserDoc;
			};
			
		}])

	.run(['$rootScope', 'couch',
		function ($rootScope, couch) {
	    $rootScope.couch = couch; 
		}])





  .controller('MainCtrl', ['$scope', '$mdSidenav',
		function ($scope, $mdSidenav) {
			/** Toggle Sidenav **/
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};  
		}])
;