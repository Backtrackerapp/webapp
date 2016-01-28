'use strict';

angular.module('backtrackerApp')
.controller('EditPostController', function ($scope, $filter, $rootScope, Journey, debug) {
  //on $scope params = {post:post, close:function()}
  this.post = $scope.params.post;
  this.post.date = $filter('date')(new Date(this.post.date), 'dd MMM yyyy');
  this.today = new Date();
  this.files = null;
  this.step = 1;

  this.save = function() {
    if(this.postText == "") {
      this.postTextError = "Please enter some text for your post";
      return;
    } else {
      this.postTextError = "";
    }

    this.step = 2;
    var file = null;
    if(this.files && this.files.length > 0) file = this.files[0];
    Journey.edit(this.post,
      function() {
        $rootScope.$broadcast('reloadJourney');
        $scope.params.close();
      },
      function() {
        alert("An error occured saving your post, please try again later");
      },
      this.files,
      function(evt) {
        console.log(evt.loaded / evt.total);
      }
    );
  }

});
