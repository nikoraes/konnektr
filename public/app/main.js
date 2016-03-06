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

  .controller('MainCtrl', ['$scope', 'cornercouch', 
		function ($scope, cornercouch) {
			
			/** Cloudant **/
		  $scope.user = {};
		  
			$scope.server = cornercouch("https://7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com", "GET");
			$scope.server.session();
			$scope.db = $scope.server.getDB('konnektr-data');
			
			$scope.submitLogin = function() {
				$scope.server.login($scope.user.username, $scope.user.password)
					.success( function() {
	          $scope.user.username = $scope.user.password = '';
	          $scope.showInfo = true;
	          $scope.server.getInfo();
	          $scope.db.getInfo();
					});
	    };		 

	    /** Sidebar Toggle **/
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