angular.module('konnektr.user.auth', [])

	.service('auth', [ '$http', '$state', '$timeout', 'session', 'couch',
		function ($http, $state, $timeout, session, couch) {
			this.isLoggedIn = function () {
				return session.getUserName() !== null;
			};
			this.logIn = function (credentials) {
				return couch.server.login(credentials.username, credentials.password)
					.then(function (response) {
						return $timeout(function() {
							couch.server.getUserDoc();	// Doesn't return a proper promise ... Todo						
						}, 1000).then(function() {
							session.create(couch.server.userCtx);							
						})
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

	.run(['$rootScope', 'auth',
		function ($rootScope, auth) {
	    auth.logOut();
	    $rootScope.auth = auth;  	    
		}])
;