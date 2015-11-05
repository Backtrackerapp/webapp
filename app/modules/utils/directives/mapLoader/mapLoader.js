'use strict';

angular.module('utils').directive('mapLoader', function(){
  return {
      restrict: 'E',
      templateUrl: '/modules/utils/directives/mapLoader/mapLoader.html',
      scope: {},
      controllerAs: 'loaderCtrl',
      controller: function ($scope) {
        this.loading = false;
        this.text = "";

        $scope.$on('loading', function(e, args) {
          this.text = args.text;
          this.loading = true;
        }.bind(this));

        $scope.$on('stopLoading', function() {
          this.loading = false;
        }.bind(this));

      }
  }
});
