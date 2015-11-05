angular.module('articles')
.controller('ArticleThumbController', function($timeout, $rootScope, $scope, $state){
    //On $scope article
    this.fade = false;

    this.display = function(article){
      var params = {id: article.id}
      $state.go('articles.article', params);
    }

    $scope.$on('show article', function(){
      this.fade = true;
    }.bind(this));

    $scope.$on('hide article', function(){
      this.fade = false;
    }.bind(this));
});
