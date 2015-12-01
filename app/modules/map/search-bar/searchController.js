'use strict';

angular.module('map')
.controller('SearchController', function ($scope, Map, $timeout, $location) {

    $scope.search = '';
    $scope.options = {
        types: 'geocode',
        watchEnter: true
    };
    if($location.path() === '/highlights'){
        $scope.show = true;
    } else {
        $scope.show = false;
    }
    $scope.result = null;

    $scope.open = false;
    $scope.button_hover = false;
    $scope.input_hover = false;

    $scope.$watch('result', function(newVal, oldVal){
        if(newVal){
            var ne = newVal.geometry.viewport.getNorthEast(),
                sw = newVal.geometry.viewport.getSouthWest();
            console.log(
                [ne.lat(), ne.lng()],
                [sw.lat(), sw.lng()]
            );
            Map.setBounds(
                [ne.lat(), ne.lng()],
                [sw.lat(), sw.lng()]
            );
        }
    });

    $scope.delayClose = function(){
        $timeout(function(){
            $scope.button_hover = false;
        }, 200);
    }

    $scope.$on('mapTapped', function(){
        $scope.open = false;
    })

    $scope.$on('tabChanged', function(test, args){
        if(args.tab === 'highlights'){
            $scope.show = true;
        } else {
            $scope.show = false;
        }
    });
});
