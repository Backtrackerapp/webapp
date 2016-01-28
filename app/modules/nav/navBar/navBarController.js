'use strict';

angular.module('nav')
.controller('NavController', function ($scope, CurrentUser, User, Auth, $timeout, $rootScope, $state, Util, Mixpanel, $stateParams) {
    this.settingsButtonDisabled = true;
    this.user = null;
    this.privacy = null;
    this.settingsShown = false;
    this.shouldShowProfile = false;
    this.profileShown = false;
    this.followersLoading = false;
    this.followingLoading = true;
    this.menu = false;
    this.menuHover = false;
    this.profileImage = null;


    if($stateParams.menu){
        this.menuHover = true
    }

    this.toggleMenu = function(force) {
        if(force !== undefined)
            this.menu = force;
        else {
            if(this.menu) {
                this.menu = false;
                this.menuHover = false;
            } else {
                this.menu = true;
            }
        }
    }

    this.openProfile = function() {
        Mixpanel.track('Nav_Bar_Profile');
        if($state.current.name === 'map.users' && $state.params.id === this.user.id +''){
            $rootScope.$broadcast('slideProfile', {id: this.user.id});
        } else {
            $state.go('map.users', {id: this.user.id});
        }
    }

    this.showProfile = function() {
        Mixpanel.track('Nav_Bar_Profile_Thumb');
        if(this.profileShown) {
            this.profileShown = false;
        } else {
            this.profileShown = true;
            this.settingsShown = false;
        }
    };

    this.showSettings = function() {
        if(this.settingsShown) {
            this.settingsShown = false;
        } else {
            this.profileShown = false;
            this.settingsShown = true;
        }
    };

    this.checkPrivacy = function() {
        this.settingsButtonDisabled = this.user.privacy === this.privacy;
    };

    this.saveSettings = function() {
        if(this.settingsButtonDisabled) {
            return;
        }
        User.update({
            privacy: this.privacy,
            access_token: CurrentUser.accessToken
        }, function() {
            CurrentUser.getUser();
            this.settingsButtonDisabled = true;
        }.bind(this));
    };

    this.login = function() {
        $rootScope.$broadcast('loginPanel', {where: 'Nav_Bar'});
    };

    this.logout = function() {
        Auth.logout();
    };

    this.hoverMenu = function(force) {
        if(force){
            this.menuHover = true;
        } else {
            $timeout(function(){
                this.menuHover = false;
            }.bind(this), 50);
        }
    }

    this.reset = function() {
        this.profileShown = false;
        this.menu = false;
    }

    $scope.$on('mapTapped', this.reset.bind(this))

    $scope.$on('$stateChangeStart', this.reset.bind(this));

    $scope.$on('refreshUser', function() {
        User.get({
            id: CurrentUser.user.id
        }, function(user){
            this.user = user;
            this.profileImage = Util.parseProfileImage(user);
        }.bind(this));
    }.bind(this));

    $scope.$on('refreshFullUser', function(test, user){
        this.user = user;
        this.profileImage = Util.parseProfileImage(user);
    }.bind(this));

    $scope.$on('loggedIn', function(){
        this.privacy = CurrentUser.user.privacy;
        User.get({
            id: CurrentUser.user.id
        }, function(user){
            this.user = CurrentUser.user = user;
            this.profileImage = Util.parseProfileImage(user);
        }.bind(this));
    }.bind(this));

    $scope.$on('logout', function(){
        this.privacy = null;
        this.user = null;
        this.reset();
    }.bind(this));

    $scope.$on('tabChanged', function() {
        this.settingsShown = false;
        if(this.shouldShowProfile) {
            this.showProfile();
            this.shouldShowProfile = false;
        } else {
            this.profileShown = false;
        }
    }.bind(this));

    $scope.$on('showProfile', function() {
        this.shouldShowProfile = true;
    }.bind(this));

});
