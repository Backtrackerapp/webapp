'use strict';

angular.module('states')
.controller('BestTripsController', function (Map, $rootScope) {
    $rootScope.$broadcast('tabChanged', {tab: 'best trips'});
});
