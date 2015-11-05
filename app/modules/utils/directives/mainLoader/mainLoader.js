'use strict';

angular.module('utils').directive('mainLoader', function(){
  return {
      restrict: 'E',
      templateUrl: '/modules/utils/directives/mainLoader/mainLoader.html',
      scope: {},
      controllerAs: 'loaderCtrl',
      controller: function ($scope, $timeout, CurrentUser) {
        this.loading = false;
        if(!CurrentUser.loggedIn){
          this.loading = true
          $scope.$on('loggedIn', function() {
            $timeout(function(){
                this.loading = false;
            }.bind(this),100);
          }.bind(this));
        }
      }
  }
});
