'use strict';

(function(){
	var app = angular.module('highlight', []);

  app.directive('viewHighlight', function(){
    return {
      restrict: 'E',
      controller: 'ViewHighlightController',
      controllerAs: 'highlightCtrl',
      scope: {
        highlight: "=highlight",
        display: "=shown"
      },
      templateUrl: 'modules/highlight/viewHighlight/viewHighlight.html'
    }
  });

  app.directive('reportHighlight', function(){
    return {
      restrict: 'E',
      controller: 'ReportController',
      controllerAs: 'reportCtrl',
      templateUrl: 'modules/highlight/highlightReport/highlightReport.html'
    };
  });

  app.directive('newHighlight', function(){
    return {
      restrict: 'E',
      controller: 'NewHighlightController',
      controllerAs: 'newCtrl',
      templateUrl: 'modules/highlight/newHighlight/newHighlight.html'
    };
  })

})();
