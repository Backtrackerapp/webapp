angular.module('states').controller('ArticlesController', function($timeout, $scope, Articles, $rootScope, $state){
  this.listView = 'index';
  this.articles = [];
  this.article = null;
  this.articleid = null;

  this.getArticles = function(){
    Articles.query({},
    function(articles){
      this.articles = articles;
      if(this.articleid) this.article = _.where(this.articles, {id: this.articleid})[0];
    }.bind(this));
  }

  if($state.current.name == "articles") this.getArticles();

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
    if((toState.name == "articles" || toState.name == "articles.category" )&& fromState.name == "articles.article") $rootScope.$broadcast('hide article');
    if(toState.name == "articles") this.getArticles();
  }.bind(this))

  $scope.$on('filter articles', function(test, args){
    this.articles = Articles.category({category: args.category});
  }.bind(this));

  $scope.$on('hide article', function(test, args){
    this.article = null
    this.articleid = null;
    this.listView = 'index'
  }.bind(this));

  $scope.$on('show article', function(test, args){
    this.articleid = parseInt(args.id);
    this.listView = 'slider'
    if(this.articles.length==0) this.getArticles();
    if(args.id && this.articles.length>0) this.article = _.where(this.articles, {id: this.articleid})[0]
    if(!this.article) {
      this.article = Articles.show({id: args.id});
    }
  }.bind(this));
});
