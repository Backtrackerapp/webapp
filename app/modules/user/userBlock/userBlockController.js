'use strict';

angular.module('user')
.controller('BlockController', function ($scope, $location, CurrentUser, User) {

  this.block = function(userId) {
  	User.block({
  		id: userId,
  		access_token: CurrentUser.accessToken
  	}, function(){
  		$scope.params.close();
      $location.path('/');
  	});
  }

});