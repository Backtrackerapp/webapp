'use strict';

angular.module('states')
  .controller('CurrentJourneyController', function ($scope, $rootScope, Journey, CurrentUser, Map, Helper) {
    this.journey = null;

    $rootScope.$broadcast('tabChanged', {tab: 'journey'});

    this.parseDate = function(date){
      return Helper.toJsDate(date);
    }

    //I really don't want to put it on the rootScope but as this will be ng-view'd I cannot pass it to myMarker
    $scope.clickPost = function(post) {
      $rootScope.$broadcast('showPost', {post: post, journey: this.journey});
    }.bind(this)

    this.getCurrentJourney = function() {
      $rootScope.$broadcast('loading', {text: "Loading current journey"});
      $rootScope.$broadcast('showChrome');
      Journey.current({
          access_token: CurrentUser.accessToken
        }, function(journey){
          this.journey = journey;
          Map.showJourney(journey);
          _.each(journey.posts, function(post) {
            post.journey_id = journey.id;
          });
        }.bind(this), function() {
          // If the current user has no journey
          $rootScope.$broadcast('stopLoading');
        });
    }

    //Get journey or wait until loggedIn
    if(CurrentUser.loggedIn) {
      this.getCurrentJourney();
    } else {
      $scope.$on('loggedIn', function(){
        this.getCurrentJourney();
      }.bind(this));
    }

    $scope.$on('reloadJourney', function() {
      this.getCurrentJourney();
    }.bind(this));

    $scope.$on('actionButtonPressed', function(e, args) {
      if(this.journey) {
        var journeyId = this.journey.id;
      } else {
        var journeyId = 0;
      }
      $rootScope.$broadcast('showModal', {
        title: "New Post",
        template: "<new-post></new-post>",
        params: {journey_id : journeyId}
      });
    }.bind(this));



  });
