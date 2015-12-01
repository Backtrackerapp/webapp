'use strict';

(function(){
	var app = angular.module('best-trips', []);

  app.directive('bestTrips', function(){
    return {
      restrict: 'E',
      controller: 'bestListController',
      controllerAs: 'bestCtrl',
      scope: {},
      templateUrl: 'modules/best-trips/trips-list-panel/main-tmpl.html'
    }
  });

  app.directive('trip-thumb', function(){
    return {
      restrict: 'E',
      controller: 'bestThumbController',
      controllerAs: 'thumbCtrl',
      scope: {},
      templateUrl: 'modules/best-trips/trips-list-panel/trip-thumb/main-tmpl.html'
    }
  });

})();
