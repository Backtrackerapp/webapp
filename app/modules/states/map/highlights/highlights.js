'use strict';

angular.module('states')
 .controller('HighlightsController', function ($scope, $rootScope, $timeout, Highlight, CurrentUser, Map, Cache, $state, $location, Mixpanel) {
    $rootScope.$broadcast('tabChanged', {tab: 'highlights'});
    $rootScope.$broadcast('showChrome');

    Mixpanel.track('Highlights_Map');

    this.highlights = Cache.highlights;
    Map.resetCluster();


    //Again don't want this on $scope but no choice due to ng-view
    $scope.clickHighlight = function(highlight) {
        var h = JSON.parse(highlight)
        $rootScope.$broadcast('showHighlight', {id: h.id});
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
    if(this.highlights.length>0) {
        this.getHighlights();
    } else {
        $timeout(function(){
            this.getHighlights();
            var map = Map.getMap();
            $timeout(function() {
                if(!map.hasLayer(Map.markers)) {
                    map.addLayer(Map.markers);
                }
            }, 10);
        }.bind(this), 100)
    }

    $scope.$on('mapUpdate', function(event, args) {
      this.within(args.bounds);
    }.bind(this));

    $scope.$on('actionButtonPressed', function(e, args) {
        if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Suggest_Highlight_Action_Button'
            });
			return;
		}
        Mixpanel.track('Highlights_Suggest_Highlight', {
        	where: 'Action_Button'
        });
        $rootScope.$broadcast('showModal', {
            title: "Suggest Highlight",
            template: "<new-highlight></new-highlight>"
        });
    });

});
