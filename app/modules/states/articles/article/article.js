angular.module('states').controller('ArticleController', function($stateParams, $rootScope){
  console.log("blah");
  $rootScope.$broadcast('show article', {articleid: $stateParams.id});
});
