'use strict';

angular.module('states')
  .controller('HighlightsController', function ($scope, $rootScope, $timeout, Highlight, CurrentUser, Map, Cache) {
    $rootScope.$broadcast('tabChanged', {tab: 'highlights'});

    this.highlights = Cache.highlights;
    Map.resetCluster();

    //Again don't want this on $scope but no choice due to ng-view
    $scope.clickHighlight = function(highlight) {
      $rootScope.$broadcast('showHighlight', {highlight: highlight});
    }

    this.within = function(bounds){
      $rootScope.$broadcast('loading', {text: "Loading highlights"});
      Highlight.within({
          access_token: CurrentUser.accessToken,
          sw_lon: bounds.getSouthWest().lng,
          sw_lat: bounds.getSouthWest().lat,
          ne_lon: bounds.getNorthEast().lng,
          ne_lat: bounds.getNorthEast().lat
        },
        function(newHighlights) {
          $rootScope.$broadcast('stopLoading');
          Cache.addHighlights(newHighlights);
        }
      );
    }

    this.getHighlights = function(){
      this.within(Map.bounds());
    }

    //If logged in get highlights or get highlights on log in
    if(CurrentUser.loggedIn) {
      this.getHighlights();
    } else {
      $scope.$on('loggedIn', function() {
        this.getHighlights();
        $rootScope.$broadcast('showChrome');
        var map = Map.getMap();
        $timeout(function() {
          if(!map.hasLayer(Map.markers)) {
            map.addLayer(Map.markers);
          }
        }, 10);
      }.bind(this));
    }

    $scope.$on('mapUpdate', function(event, args) {
      this.within(args.bounds);
    }.bind(this));

    $scope.$on('actionButtonPressed', function(e, args) {
      $rootScope.$broadcast('showModal', {
        title: "Suggest Highlight",
        template: "<new-highlight></new-highlight>"
      });
    });

});
