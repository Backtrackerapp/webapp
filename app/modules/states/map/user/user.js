'use strict';

angular.module('states')
.controller('UserController', function ($scope, $rootScope, $stateParams, User, CurrentUser, Map, $state) {
  $rootScope.$broadcast('tabChanged', {tab: 'friends'});
  $rootScope.$broadcast('hideChrome');

  this.user = null;

  this.getUser = function(){
    $rootScope.$broadcast('loading', {text: "Loading user"});
    User.get({
        id: $stateParams.id,
        access_token: CurrentUser.accessToken
      },
      function(user) {
        $rootScope.$broadcast('stopLoading');
        $rootScope.$broadcast('showFullUser', {user: user})
        this.user = user;
        if(user.latitude) {
          Map.center(user.latitude, user.longitude);
        }
      }.bind(this),
    function(error){
      $state.go("map.current");
    });
  }

  if(CurrentUser.loggedIn) {
    this.getUser();
  } else {
    $scope.$on('loggedIn', function() {
      this.getUser();
    }.bind(this));
  }

  $scope.$on('actionButtonPressed', function(e, args) {
      $rootScope.$broadcast('showModal', {
        title: "Add Friends",
        class: "add-friends",
        template: "views/friends/add.html",
        journey_id: 1
      });
    });
});
