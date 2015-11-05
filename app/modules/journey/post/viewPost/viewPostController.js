angular.module('journey')
.controller('ViewPostController', function($scope, $rootScope, $timeout, debug, Helper, Journey, CurrentUser){
	//Models on $Scope - Post, Journey
	this.popupShown = false;
	this.prevDisabled = true;
	this.nextDisabled = true;
	this.prevPost = null;
	this.nextPost = null;

  this.prev = function() {
  	var delay = 300
    if(!this.prevDisabled) {
    	this.close(delay);
      $timeout(function() {
        $scope.post = this.prevPost;
      }.bind(this), delay);
    }
  }

  this.next = function() {
  	var delay = 300
    if(!this.nextDisabled) {
      this.close(delay);
      $timeout(function() {
        $scope.post = this.nextPost;
      }.bind(this), delay);
    }
  }

  this.close = function(reopen) {
    this.popupShown = false;
    $scope.$emit('close', {
    	open: reopen
    });
  }

  this.togglePopup = function() {
    if(this.popupShown) {
      this.popupShown = false;
    } else {
      this.popupShown = true;
    }
  }

  //Move this to a Post service... no more $resource!!! //TODO
  this.deletePost = function(post) {
    this.close();
    Journey.remove.post({
    	journey_id: post.journey_id,
    	post_id: post.id,
    	access_token: CurrentUser.accessToken
    }, function(data) {
      $rootScope.$broadcast('reloadJourney');
    });
  }

  this.editPost = function(post) {
    this.close();
    $rootScope.$broadcast('showModal', {
      title: "Edit Post",
      template: "<edit-post></edit-post>",
      params: {post: post}
    });
  }

  this.shareFacebook = function(post) {
    FB.ui({
      method: 'share',
      href: 'http://app.backtrackerapp.com/#/journey/' + post.journey_id,
      }, function(response){});
    //Make a facebook service // this might be okay actually :)
  }

  this.shareTwitter = function(post) {
    var top = ($(window).height() - 575) / 2;
    var left = ($(window).width() - 400) / 2;
    var opts = 'status=1,width=575,height=400,top=' + top + ',left=' + left;
    window.open('https://twitter.com/intent/tweet?url=http://app.backtrackerapp.com/%23/journey/' + post.journey_id + '&text=Check+out+this+journey!&hashtags=backtracker', "Twitter", opts);
    //Make a twitter service
  }

  this._initializeNavigation = function() {
    this.prevDisabled = false;
    this.nextDisabled = false;
    var normalPosts = _.where($scope.journey.posts, {ghost: false});
    _.forEach(normalPosts, function(post, i) {
      if(post.id == $scope.post.id) {
        if(i == 0) {
          // Last post in journey
          this.nextDisabled = true;
        } else {
          this.nextPost = normalPosts[i - 1];
        }
        if(i == normalPosts.length - 1) {
          // First post in journey
          this.prevDisabled = true;
        } else {
          this.prevPost = normalPosts[i + 1];
        }
      }
    }.bind(this));
  }

  //When $scope.post changes, redo the nav
  $scope.$watch('post', this._initializeNavigation.bind(this));

  //-- Start nav ---!!!
  this._initializeNavigation();


});
