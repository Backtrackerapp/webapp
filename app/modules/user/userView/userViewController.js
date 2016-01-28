'use strict';

angular.module('user')
.controller('UserViewController', function ($scope, User, CurrentUser, Cache) {
    this.user = null;
    this.contentShown = false;
    this.shown = false;

    this.showUser = function(user){
        //If we visit /journey/:id of a journey we belong to the userView should not display
        if(CurrentUser.user && user.id == CurrentUser.user.id) {
            this.shown = false;
            return;
        }
        this.user = user;
        this.contentShown = false;
        this.shown = true;
    }

    this.toggleContent = function(value){
        this.contentShown = value === undefined ? !this.contentShown : value;
    }.bind(this)

    this.getUser = function(userid){
        User.get({id: userid}, function(user) {
            this.showUser(user);
        }.bind(this));
    }

    $scope.$on('showUser', function(test, args) {
        if(args.userObject) {
            //Due to async loading... If we are showing the user from a deep link we have not logged in
            //solution? use the surroget provided and wait for the loggin message, then update the user then
            this.getUser(args.userObject.id);
        } else {
            this.showUser(JSON.parse(args.user));
        }
    }.bind(this));

    $scope.$on('showFullUser', function(test, args) {
        this.showUser(args.user);
    }.bind(this));

    $scope.$on('tabChanged', function() {
        this.shown = false;
    }.bind(this));

});
