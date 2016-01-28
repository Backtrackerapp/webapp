'use strict';

angular.module('map')
.controller('SearchController', function ($scope, Map, $timeout, $location, Mixpanel) {

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
            Mixpanel.track('Highlights_Search', {result: $scope.search});
            console.log(newVal);
            if(newVal.geometry.viewport){
                var ne = newVal.geometry.viewport.getNorthEast(),
                    sw = newVal.geometry.viewport.getSouthWest();
                Map.setBounds(
                    [ne.lat(), ne.lng()],
                    [sw.lat(), sw.lng()]
                );
            } else {
                Map.center(
                    newVal.geometry.location.lat(),
                    newVal.geometry.location.lng(),
                    11
                )
            }

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
