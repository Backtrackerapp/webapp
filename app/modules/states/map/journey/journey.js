'use strict';

angular.module('states')
.controller('JourneyController', function ($scope, $rootScope, $stateParams, Journey, Helper, CurrentUser, Map, $location, underscore) {
    this.journey = null;

    $rootScope.$broadcast('tabChanged', {tab: 'journey'});

    this.parseDate = function(date){
        return Helper.toJsDate(date);
    }

    //I really don't want to put it on the scope but as this will be ng-view'd I cannot pass it to myMarker
    $scope.clickPost = function(post) {
        $rootScope.$broadcast('showPost', {post: post, journey: this.journey});
    }.bind(this)

    this.loadJourney = function() {
        $rootScope.$broadcast('loading', {text: "Loading journey"});
        Journey.get({id: $stateParams.id}, function(journey) {
            this.journey = journey;
            Map.showJourney(journey);
            underscore.each(journey.posts, function(post) {
                post.journey_id = journey.id;
            });
            if(!journey.posts[0].can_edit) {
                $rootScope.$broadcast('showUser', {userObject: journey.posts[0].user})
                $rootScope.$broadcast('hideChrome');
            } else {
                $rootScope.$broadcast('showChrome');
            }
        }.bind(this),
        function() {
            $location.path('/');
        });
    }

    //Get journey
    this.loadJourney();

    //If the journey is the current users fetch again with access_token as to know that you can post... This is so silly fix TODO
    $scope.$on('loggedIn', function() {
        if(this.journey && this.journey.posts[0].user.id == CurrentUser.user.id) {
            this.loadJourney();
        }
    }.bind(this))

    $scope.$on('reloadJourney', function() {
        this.loadJourney();
    }.bind(this));

    $scope.$on('actionButtonPressed', function(e, args) {
        if(this.journey.posts[0].can_edit) {
            $rootScope.$broadcast('showModal', {
                title: "New Post",
                template: "<new-post></new-post>",
                params: {journey_id : this.journey.id}
            });
        }
    }.bind(this));

});
