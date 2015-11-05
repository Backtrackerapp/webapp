angular.module('articles')
.controller('ViewArticleController', function($scope){
    //on $scope article

    //This give the scrolling fade effect
    $(".article-view").scroll(function(){
      var newMask = "-webkit-gradient(linear, left "+
          (80-($(this).scrollTop()/3.5))
          +"%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"
      $(".article-image")
        .css("-webkit-mask-image", newMask);
    });
})
