'use strict';

(function(){
	var app = angular.module('journey', []);

  app.directive('viewPost', function(){
    return {
      restrict: 'E',
      controller: 'ViewPostController',
      controllerAs: 'postCtrl',
      scope: {
        post: "=post",
        display: "=shown",
        journey: "=journey"
      },
      templateUrl: 'modules/journey/post/viewPost/viewPost.html'
    }
  });

  app.directive('newPost', function(){
    return {
      restrict: 'E',
      controller: 'NewPostController',
      controllerAs: 'newCtrl',
      templateUrl: 'modules/journey/post/newPost/newPost.html'
    }
  });

  app.directive('editPost', function(){
    return {
      restrict: 'E',
      controller: 'EditPostController',
      controllerAs: 'editCtrl',
      templateUrl: 'modules/journey/post/editPost/editPost.html'
    };
  });

})();
