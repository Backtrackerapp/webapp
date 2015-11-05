'use strict';

(function(){
	var app = angular.module('modal', []);

  app.directive('modal', function(){
    return {
      restrict: 'E',
      controller: 'ModalController',
      controllerAs: 'modalCtrl',
      templateUrl: 'modules/modal/modal.html',
      scope: {}
    };
  })
  
})();
