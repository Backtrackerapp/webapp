'use strict';
(function(){
  var app = angular.module('articles', []);

  app.directive('articlesList', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/articles/articlesList/articlesList.html',
      controller: 'ArticlesListController',
      controllerAs: 'listCtrl',
      scope: {
        view: "=",
        article: "=",
        articles: "="
      }
    }
  });

  app.directive('articleThumb', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/articles/articleThumb/articleThumb.html',
      controller: 'ArticleThumbController',
      controllerAs: 'thumbCtrl',
      scope: {
        article: "="
      }
    }
  });

    app.directive('viewArticle', function(){
      return {
        restrict: 'E',
        templateUrl: 'modules/articles/viewArticle/viewArticle.html',
        controller: 'ViewArticleController',
        controllerAs: 'artCtrl',
        scope: {
          article: "="
        }
      }
    });

})();
