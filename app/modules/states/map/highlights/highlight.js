'use strict';

angular.module('states')
  .controller('HighController', function ($scope, $rootScope, $stateParams) {
      debugger;

      if($stateParams.id){
          $rootScope.$broadcast('showHighlight', {id: $stateParams.id});
      }


});
