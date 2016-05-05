(function() {
	'use strict';

	angular.module('konnektr.core')		
	
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
				} else {this.db = null;}
				return this.db;
			};
			
			this.getDB = function () {
				return this.db;
			};
			
			this.getDBname = function () {
				return this.dbName;
			};
			
		}])

	.run(['$rootScope', 'couch',
		function ($rootScope, couch) {
	    $rootScope.couch = couch; 
		}])
;	
	
})();