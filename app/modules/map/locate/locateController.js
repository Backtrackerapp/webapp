'use strict';

angular.module('map')
.controller('LocateController', function ($scope, Map) {
    $scope.locate = function(){
        var map = Map.getMap();
        map.locate({setView: true});
    }

});
