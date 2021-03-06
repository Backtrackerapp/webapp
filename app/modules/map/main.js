'use strict';

(function(){
    var app = angular.module('map', [
        'angular-mapbox'
    ])

    app.run(function(mapboxService){
        mapboxService.init({
            accessToken: "pk.eyJ1IjoicWlwY3JlYXRpdmUiLCJhIjoicEZjanpjcyJ9.89AlxlIQmjcA69z_zr2e9w"
        })
    });

    //app.directive myMarker

    app.directive('map', function(){
        return {
            restrict: "E",
            templateUrl: "modules/map/map/map.html",
            controller: "MapController",
            controllerAs: "mapCtrl",
            scope: {}
        }
    })

    app.directive('searchBar', function(){
        return {
            restrict: "E",
            templateUrl: "modules/map/search-bar/search.html",
            controller: "SearchController",
            scope: {}
        }
    });

    app.directive('locateButton', function(){
        return {
            restrict: "E",
            templateUrl: "modules/map/locate/locate.html",
            controller: "LocateController",
            scope: {}
        }
    });
})();
