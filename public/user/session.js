angular.module('konnektr.user.session', [])

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

	.run(['$rootScope', 'session',
		function ($rootScope, auth, session) {
	    $rootScope.session = session;    	    
		}])