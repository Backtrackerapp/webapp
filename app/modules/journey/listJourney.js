'use strict';

//If you want to change the template create a new folder to store this file and template

angular.module('journey').directive('listJourney', function($location) {
  return {
    restrict: 'E',
    replace: true,
    template: '<li><h2>{{ journey.name }}</h2><h3>{{journey.posts_count}} Posts</h3></li>',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        scope.$apply(function() {
          $location.path('/journey/' + scope.$eval(attrs.journey).id);
        });
      });
    }
  }
});
