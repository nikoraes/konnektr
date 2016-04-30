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
	'konnektr.assets.createasset',
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