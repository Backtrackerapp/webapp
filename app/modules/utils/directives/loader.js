'use strict';

angular.module('utils').directive('loader', function($compile, $location) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="loading-gif"></div>'
  }
});
