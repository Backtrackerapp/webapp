'use strict';

angular.module('journey')
.controller('ViewPostController', function($scope, $rootScope, $timeout, debug, Helper, Journey, CurrentUser, underscore, Map, Mixpanel){
	//Models on $Scope - Post, Journey
	this.popupShown = false;
	this.prevDisabled = true;
	this.nextDisabled = true;
	this.prevPost = null;
	this.nextPost = null;

	console.log($scope.post);

	$scope.$watch('post', function(newVal){
		if(newVal){
			Mixpanel.track('Journey_View_Post', {
				id: $scope.journey.id
			});
			Map.center(newVal.latitude, newVal.longitude, 7);
		}
	})


	this.prev = function() {
		Mixpanel.track('Journey_Nav', {
			type: 'previous'
		});
		var delay = 300;
		if(!this.prevDisabled) {
			this.close(delay);
			$timeout(function() {
				$scope.post = this.prevPost;
			}.bind(this), delay);
		}
	};

	this.next = function() {
		Mixpanel.track('Journey_Nav', {
			type: 'next'
		});
		var delay = 300;
		if(!this.nextDisabled) {
			this.close(delay);
			$timeout(function() {
				$scope.post = this.nextPost;
			}.bind(this), delay);
		}
	};

	this.close = function(reopen) {
		this.popupShown = false;
		$scope.$emit('close', {
			open: reopen
		});
	};

	this.togglePopup = function() {
		if(this.popupShown) {
			this.popupShown = false;
		} else {
			this.popupShown = true;
		}
	};

	//Move this to a Post service... no more $resource!!! //TODO
	this.deletePost = function(post) {
		this.close();
		Mixpanel.track('Journey_Delete_Post');
		Journey.remove.post({
			journey_id: post.journey_id,
			post_id: post.id,
			access_token: CurrentUser.accessToken
		}, function() {
			$rootScope.$broadcast('reloadJourney');
		});
	};

	this.editPost = function(post) {
		this.close();
		Mixpanel.track('Journey_Edit_Post');
		$rootScope.$broadcast('showModal', {
			title: "Edit Post",
			template: "<edit-post></edit-post>",
			params: {post: post}
		});
	};

	this.shareFacebook = function(post) {
		Mixpanel.track('Journey_Share', {
			social: 'Facebook',
			mine: post.canEdit
		});
		FB.ui({
			method: 'share',
			href: 'http://app.backtrackerapp.com/#/journey/' + post.journey_id,
		}, function(response){});
		//Make a facebook service // this might be okay actually :)
	}

	this.shareTwitter = function(post) {
		Mixpanel.track('Journey_Share', {
			social: 'Twitter',
			mine: post.canEdit
		});
		var top = ($(window).height() - 575) / 2;
		var left = ($(window).width() - 400) / 2;
		var opts = 'status=1,width=575,height=400,top=' + top + ',left=' + left;
		window.open('https://twitter.com/intent/tweet?url=http://app.backtrackerapp.com/%23/journey/' + post.journey_id + '&text=Check+out+this+journey!&hashtags=backtracker', "Twitter", opts);
		//Make a twitter service
	}

	this._initializeNavigation = function() {
		this.prevDisabled = false;
		this.nextDisabled = false;
		var normalPosts = underscore.where($scope.journey.posts, {ghost: false});
		underscore.forEach(normalPosts, function(post, i) {
			if(post.id === $scope.post.id) {
				if(i === 0) {
					// Last post in journey
					this.nextDisabled = true;
				} else {
					this.nextPost = normalPosts[i - 1];
				}
				if(i === normalPosts.length - 1) {
					// First post in journey
					this.prevDisabled = true;
				} else {
					this.prevPost = normalPosts[i + 1];
				}
			}
		}.bind(this));
	};

	//When $scope.post changes, redo the nav
	$scope.$watch('post', this._initializeNavigation.bind(this));

	//-- Start nav ---!!!
	this._initializeNavigation();


});
