'use strict';

angular.module('map')
  .service('Map', function ($rootScope, mapboxService, $timeout, debug) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.bounds = null;
    this.featureLayer = null;
    this.markers = null;

    this.showJourney = function(journey){
      $rootScope.$broadcast('stopLoading');
      var line = {
        type: "FeatureCollection",
        features: []
      }
      var stroke = journey.posts[0].can_edit ? "#f06e40" : '#39cccc'
      line.features.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: []
        },
        properties: {
          "stroke-width": 2,
          stroke: stroke
        }
      });
      _.each(_.where(journey.posts, {ghost: false}), function(post) {
        line.features[0].geometry.coordinates.push([post.longitude, post.latitude])
      })
      if(_.findWhere(journey.posts, {ghost: true})) {
        var ghost = _.findWhere(journey.posts, {ghost: true});
        var link = _.findWhere(journey.posts, {ghost: false});
        line.features.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [[link.longitude, link.latitude],[ghost.longitude, ghost.latitude]]
          },
          properties: {
            "stroke-width": 2,
            stroke: "#c5bcab"
          }
        })
      }
      this.removeFeatureLayer();
      this.setFeatureLayer(line);
      this.fitBounds();
    }

    this.onMove = function(bounds) {
      $rootScope.$broadcast('mapUpdate', {bounds: bounds});
    }

    this.onZoom = function(bounds) {
      $rootScope.$broadcast('mapUpdate', {bounds: bounds});
    }

    this.fitBounds = function() {
      $timeout(function() {
        var map = mapboxService.getMapInstances()[0];
        var group = new L.featureGroup(mapboxService.getMarkers());
        map.fitBounds(group.getBounds(), {
          paddingTopLeft: [100, 130],
          paddingBottomRight: [100, 100]
        });
      }, 0);
    }

    this.setFeatureLayer = function(feature) {
      var map = mapboxService.getMapInstances()[0];
      var geojsonObject = feature;
      this.featureLayer = L.mapbox.featureLayer(geojsonObject).addTo(map);
    }

    this.removeFeatureLayer = function() {
      if(this.featureLayer) {
        this.featureLayer.clearLayers()
      }
    }

    this.bounds = function() {
      return mapboxService.getMapInstances()[0].getBounds()
    }

    this.getMap = function(){
      return mapboxService.getMapInstances()[0];
    }

    this.center = function(latitude, longitude) {
      var map = mapboxService.getMapInstances()[0];
      map.setView([latitude, longitude], 7);
    }

    this.resetCluster = function() {
      this.markers = new L.MarkerClusterGroup({
        iconCreateFunction: function(cluster) {
          return L.divIcon({
            className: 'clustered-icon',
            iconSize: [48, 53],
            iconAnchor: [24, 52],
            html: '<span>' + cluster.getChildCount() + '</span>'
          })
        },
        disableClusteringAtZoom: 12,
        maxClusterRadius: 30,
        showCoverageOnHover: false
      });
    }

    this.resetCluster();

    this.addClusteredMarker = function(marker) {
      if(this.markers) this.markers.addLayer(marker);
    }

  });
