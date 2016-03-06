angular.module('konnektr.main', [])
	
	.config(['$urlRouterProvider',
		function($urlRouterProvider) {
		  $urlRouterProvider.otherwise("/dashboard");
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

  .controller('MainCtrl', ['$scope', 
		function ($scope) {
		    /**
		     * Sidebar Toggle
		     */
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