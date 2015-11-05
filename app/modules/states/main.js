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
        url: "/",
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

      .state('gallery', {
        url: '/gallery',
        templateUrl: 'modules/states/gallery/gallery.html'
      })

      .state('articles', {
        url: '/articles',
        templateUrl: 'modules/states/articles/articles.html',
        controller: 'ArticlesController',
        controllerAs: 'artCtrl'
      })
      .state('articles.category', {
        url: '/category/:category',
        onEnter: function($stateParams, $rootScope, $timeout){
          $timeout(function(){
            $rootScope.$broadcast('filter articles', $stateParams);
          }, 0);
        }
      })
      .state('articles.article', {
        url: '/:id',
        onEnter: function($stateParams, $rootScope, $timeout, $state){
          if(!$stateParams.id) {
            $state.go('articles');
          } else {
            $timeout(function(){
              $rootScope.$broadcast('show article', $stateParams);
            }, 0);
          }
        }
      })
  });
})();