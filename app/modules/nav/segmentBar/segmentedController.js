'use strict';

angular.module('backtrackerApp')
  .controller('SegmentedController', function ($scope, $rootScope, Map, $location, $window) {
    this.active = 'journey';
    this.shown = true;

    //The broadcast should be sent here!!! Also don't use href for routing... put it in the javascript TODO

    $scope.$on('tabChanged', function(test, args) {
      this.active = args.tab;
      // Google analytics. Send pageview.... THIS SHOULDN'T BE HERE EITHER!!!!! TODO
      $window.ga('send', 'pageview', { page: $location.url() });
    }.bind(this))

    $scope.$on('hideChrome', function() {
      this.shown = false;
    }.bind(this));

    $scope.$on('showChrome', function() {
      this.shown = true;
    }.bind(this))
  }); 