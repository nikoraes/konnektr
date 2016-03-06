/*globals angular */
angular.module('konnektr', [
	'ui.bootstrap',
	'ui.router',
	'ui.router.title',
	'CornerCouch',
	'angular-jwt',
  'angular-storage',
	'konnektr.main',
	'konnektr.common',
	'konnektr.user.login',
	'konnektr.dashboard',
	'konnektr.explore',
	'konnektr.visualize'
	]);