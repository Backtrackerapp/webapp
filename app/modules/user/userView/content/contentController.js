'use strict';

angular.module('user').controller('contentController', function($scope, User, CurrentUser, debug){
  //Params on $Scope
  //user
  //shown

  this.active = 'journeys'
  this.template = "modules/user/userView/content/view/journeys.html"
  this.followersLoading = false;
  this.followingLoading = false;

  //need to get the users followers and following as get doesn't
	this.activate = function(name) {
    this.active = name;
    this.template = "modules/user/userView/content/view/" + name + ".html";
    if(name == "followers") {
      if(typeof $scope.user.followers === "undefined") {
        this.followersLoading = true;
        User.followers({id: $scope.user.id}, function(users) {
          this.followersLoading = false;
          $scope.user.followers = users;
        }.bind(this));
      }
    }
    if(name == "following") {
      if(typeof $scope.user.following === "undefined") {
        this.followingLoading = true;
        User.following({id: $scope.user.id}, function(users) {
          this.followingLoading = false;
          $scope.user.following = users;
        }.bind(this));
      }
    }
  }

  //So when user changes if it's a new user displayed... change back to journeys
  $scope.$watch('user', function(newValue, oldValue){
    this.activate('journeys');
  }.bind(this));
});
