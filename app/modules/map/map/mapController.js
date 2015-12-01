'use strict';

angular.module('map')
.controller('MapController', function ($scope, $timeout, $rootScope, $element, mapboxService, Map) {

  //Put this in a directory with loader
  $scope.loading = true;

  //Due to angular-mapbox these must be on the $scope. I think this package is more hassle than it's worth TODO
  $scope.mapMovedCallback = Map.onMove;
  $scope.mapZoomedCallback = Map.onZoom;

  this.tapped = function(){
    $rootScope.$broadcast('mapTapped');
  }

  $scope.$on('tabChanged', function(test, args) {
    Map.removeFeatureLayer();
    var map = Map.getMap();
    if(!map) return;
    //Some problem with async?
    if(args.tab === 'highlights') {
      $timeout(function() {
        if(!map.hasLayer(Map.markers)) {
          map.addLayer(Map.markers);
        }
      }, 10);
    } else {
      if(map.hasLayer(Map.markers)) {
        map.removeLayer(Map.markers);
      }
    }
  });



});
