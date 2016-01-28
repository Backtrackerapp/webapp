'use strict';

angular.module('states')
.controller('UserController', function ($scope, $rootScope, $stateParams, User, CurrentUser, Map, $state, Util, Mixpanel) {
    $rootScope.$broadcast('tabChanged', {tab: 'friends'});
    // $rootScope.$broadcast('hideChrome');

    this.user = null;
    this.profileImage = null;

    this.getUser = function(){
        $rootScope.$broadcast('loading', {text: "Loading user"});
        User.get({
            id: $stateParams.id,
            access_token: CurrentUser.accessToken
        },
        function(user) {
            $rootScope.$broadcast('stopLoading');
            $rootScope.$broadcast('showFullUser', {user: user});
            this.user = user;
            this.profileImage = Util.parseProfileImage(user, 40);
            if(user.latitude) {
                Map.center(user.latitude, user.longitude);
            }
        }.bind(this),
        function(){
            $state.go("map.current");
        });
    };

    this.getUser();
    // } else {
    //     $scope.$on('loggedIn', function() {
    //         this.getUser();
    //     }.bind(this));
    // }

    $scope.$on('actionButtonPressed', function() {
        if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Users_Action_Button'
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
