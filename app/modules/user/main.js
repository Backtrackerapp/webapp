'use strict';

(function(){
	var app = angular.module('user', []);

  app.directive('userView', function(){
    return {
      restrict: 'E',
      controller: 'UserViewController',
      controllerAs: 'userCtrl',
      scope: {},
      templateUrl: 'modules/user/userView/userView.html'
    }
  });

  app.directive('userContent', function(){
  	return {
  		restrict: 'E',
  		controller: 'contentController',
      controllerAs: 'contentCtrl',
  		templateUrl: 'modules/user/userView/content/content.html',
  		scope: {
  			user: "="
  		}
  	}
  });

  app.directive('userHead', function(){
  	return {
  		restrict: 'E',
  		controller: 'headController',
      controllerAs: 'headCtrl',
  		templateUrl: 'modules/user/userView/head/head.html',
  		scope: {
  			user: "=",
  			showContent: "=content"
  		}
  	}
  });

  //These should be wrapped by the HTMLInsert util to gain full functionallity

  app.directive('reportUser', function(){
    return {
      restrict: 'E',
      controller: 'ReportController',
      controllerAs: 'reportCtrl',
      templateUrl: 'modules/user/userReport/userReport.html'
    }
  });

  app.directive('blockUser', function(){
    return {
      restrict: 'E',
      controller: 'BlockController',
      controllerAs: 'blockCtrl',
      templateUrl: 'modules/user/userBlock/userBlock.html'
    }
  });

  app.directive('addFriends', function(){
    return {
      restrict: 'E',
      controller: 'AddFriendsController',
      controllerAs: 'addCtrl',
      templateUrl: 'modules/user/addFriends/addFriends.html'
    }
  });


})();