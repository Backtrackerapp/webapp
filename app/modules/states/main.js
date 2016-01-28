'use strict';

(function(){
    var app = angular.module('states', [
        'ui.router'
    ]);

    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
        .state('map', {
            abstract: true,
            templateUrl: "modules/states/map/map.html"
        })
        .state('map.current', {
            url: "/?login&menu",
            templateUrl: "modules/states/map/journey/journey.html",
            controller: 'CurrentJourneyController',
            controllerAs: 'journeyCtrl'
        })
        .state('map.journey', {
            url: '/journey/:id',
            templateUrl: 'modules/states/map/journey/journey.html',
            controller: 'JourneyController',
            controllerAs: 'journeyCtrl'
        })
        .state('map.highlights', {
            url: '/highlights',
            templateUrl: 'modules/states/map/highlights/highlights.html',
            controller: 'HighlightsController',
            controllerAs: 'highlightsCtrl'
        })

        .state('map.friends', {
            url: '/friends',
            templateUrl: 'modules/states/map/friends/friends.html',
            controller: 'FriendsController',
            controllerAs: 'friendsCtrl'
        })
        .state('map.users', {
            url: '/users/:id',
            templateUrl: 'modules/states/map/user/user.html',
            controller: 'UserController',
            controllerAs: 'userCtrl'
        })

        .state('map.besttrips', {
            url: '/best_trips?id',
            controller: 'BestTripsController'
        });
    });
})();
