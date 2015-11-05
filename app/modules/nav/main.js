(function(){
	var app = angular.module("nav", []);

	app.directive("navBar", function(){
    return {
      restrict: 'E',
      controller: 'NavController',
      controllerAs: 'navCtrl',
      templateUrl: 'modules/nav/navBar/navBar.html',
      scope: {}
    }
  });

  app.directive("segmentBar", function(){
    return {
      restrict: 'E',
      controller: 'SegmentedController',
      controllerAs: 'segCtrl',
      templateUrl: 'modules/nav/segmentBar/segmented.html',
      scope: {}
    }
  });

  app.directive("actionButton", function(){
    return {
      restrict: 'E',
      controller: 'ActionButtonController',
      controllerAs: 'actionCtrl',
      templateUrl: 'modules/nav/actionButton/actionButton.html',
      scope: {}
    }
  });
})();
