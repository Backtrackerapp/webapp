'use strict';

angular.module('states')
.controller('FriendsController', function ($scope, $rootScope, User, CurrentUser, Map, Cache, Util, Mixpanel) {
    $rootScope.$broadcast('tabChanged', {tab: 'friends'});
    Mixpanel.track('Friends_Map_Tab');

    this.friends = Cache.friends;

    $scope.profileImage = Util.parseProfileImage;

    //Yet again don't want this on $scope but no choice
    $scope.clickUser = function(user) {
        Mixpanel.track('Friends_View_Profile');
        $rootScope.$broadcast('showUser', {user: user});
    }

    this.getFriends = function(){
        $rootScope.$broadcast('showChrome');
        this.within(Map.bounds());
    }

    this.within = function(bounds){
        $rootScope.$broadcast('loading', {text: "Loading friends"});
        User.within({
            access_token: CurrentUser.accessToken,
            sw_lon: bounds.getSouthWest().lng,
            sw_lat: bounds.getSouthWest().lat,
            ne_lon: bounds.getNorthEast().lng,
            ne_lat: bounds.getNorthEast().lat
        },
        function(newFriends) {
            Cache.addFriends(newFriends);
            $rootScope.$broadcast('stopLoading');
        });
    }

    //If logged in get friends otherwise wait to be logged in
    if(CurrentUser.loggedIn) {
        this.getFriends();
    } else {
        $rootScope.$broadcast('hideChrome');
        $scope.$on('loggedIn', function() {
            this.getFriends();
        }.bind(this));
    }

    $scope.$on('mapUpdate', function(event, args) {
        this.within(args.bounds);
    }.bind(this));


    $scope.$on('actionButtonPressed', function(e, args) {
        if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Friends_Action_Button'
            });
			return;
		}
        Mixpanel.track('Friend_Add');
        $rootScope.$broadcast('showModal', {
            title: "Add Friends",
            template: "<add-friends></add-friends>"
        });
    });
});
