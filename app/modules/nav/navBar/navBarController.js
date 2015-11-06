'use strict';

angular.module('backtrackerApp')
.controller('NavController', function ($scope, CurrentUser, User, Auth) {
    this.settingsButtonDisabled = true;
    this.user = null;
    this.privacy = null;
    this.settingsShown = false;
    this.shouldShowProfile = false;
    this.profileShown = false;
    this.followersLoading = false;
    this.followingLoading = true;

    this.showProfile = function() {
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
        Auth.loginFacebook();
    };

    this.logout = function() {
        Auth.logout();
    }

    $scope.$on('$stateChangeStart', function(){
        this.profileShown = false;
    }.bind(this));

    $scope.$on('refreshUser', function() {
        User.get({
            id: CurrentUser.user.id
        }, function(user){
            this.user = user;
        }.bind(this));
    }.bind(this));

    $scope.$on('loggedIn', function(){
        this.privacy = CurrentUser.user.privacy;
        User.get({
            id: CurrentUser.user.id
        }, function(user){
            this.user = user;
        }.bind(this));
    }.bind(this));

    $scope.$on('logout', function(){
        this.privacy = null;
        this.user = null;
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
