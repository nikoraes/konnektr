(function() {
	'use strict';
	
	angular.module('konnektr', [
		'konnektr.core',
		'konnektr.main',
		'konnektr.assets',
		'konnektr.user.auth',
		'konnektr.user.session',
		'konnektr.user.login',
		'konnektr.user.profile',
		'konnektr.user.register',
		'konnektr.database.createdb',	
		'konnektr.database.database',
		'konnektr.dashboard',
		'konnektr.trends'
	]);

})();