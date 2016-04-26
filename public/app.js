/*globals angular */
angular.module('konnektr', [
	'ngMaterial',
	'ngMessages',
	'md.data.table',
	'ui.router',
	'ui.router.title',
	'angular-cornercouch',
	'konnektr.main',
	'konnektr.assets.assetlist',
	'konnektr.assets.editasset',
	'konnektr.user.auth',
	'konnektr.user.session',
	'konnektr.user.login',
	'konnektr.user.profile',
	'konnektr.user.register',
	'konnektr.databases.createdb',	
	'konnektr.databases.databaselist',
	'konnektr.dashboard',
	'konnektr.trends'
	]);