'use strict';

angular.module('backtrackerApp')
.controller('NavController', function ($scope, CurrentUser, User, apiUrl, debug, $state, $timeout) {
  this.settingsButtonDisabled = true;
  this.user = null;
  this.privacy = null;
  this.settingsShown = false;
  this.shouldShowProfile = false;
  this.profileShown = false;
  this.followersLoading = false;
  this.followingLoading = true;
  this.blogsShown = false;
  this.regioncode = {
    "Latin America": 'latinamerica',
    "North America": 'northamerica',
    "Europe": 'europe',
    "Africa": 'africa',
    "Australasia": 'aus',
    "Asia": 'asia',
    "Blog": 'blog'
  }
  this.regions = Object.keys(this.regioncode);

  this.showProfile = function() {
    if(this.profileShown) {
      this.profileShown = false;
    } else {
      this.profileShown = true;
      this.settingsShown = false;
    }
  }

  this.showSettings = function() {
    if(this.settingsShown) {
      this.settingsShown = false;
    } else {
      this.profileShown = false;
      this.settingsShown = true;
    }
  }

  this.checkPrivacy = function() {
    this.settingsButtonDisabled = this.user.privacy == this.privacy;
  }

  this.saveSettings = function() {
    if(this.settingsButtonDisabled) {
      return;
    }
    User.update({
      privacy: this.privacy,
      access_token: CurrentUser.accessToken
    }, function() {
      CurrentUser.getUser()
      this.settingsButtonDisabled = true;
    }.bind(this));
  }

  this.blogsMenu = function() {
    if(this.blogsShown){
      this.blogsClose();
    } else {
      this.blogsOpen();
    }
  }

  this.options = {
    speed : 100,
		gutter : 5,
		delay : 75,
		random : false
  };

  this.blogsOpen = function(){
    if(this.blogsShown) return;
    var self = this;
    var div = $(".blog-menu");
    var lis = $(".blog-box");
		div.toggleClass( 'cd-active', true);
    lis.each( function( i ) {
      $( this ).css( {
        transition: "all "+self.options.speed+"ms ease",
        'transition-delay' : ( ( self.regions.length - 1 - i ) * self.options.delay ) + 'ms'
      });
    } );
		lis.each( function( i ) {
			$( this ).css( {
				opacity : 1,
				top : ( i + 1 ) * ( 78 + self.options.gutter ) + 60,
				width : div.width,
				marginLeft : 0,
				transform : self.options.random ? 'rotate(' + Math.floor( Math.random() * 11 - 5 ) + 'deg)' : 'none'
			} );
		} );
    lis.each( function( i ) {
      $( this ).css( {
        'transition-delay' : "0s"
      });
    } );
    this.blogsShown = true;
  }

  this.blogsClose = function(instant) {
    if(!this.blogsShown) return;
    var self = this;
    var div = $(".blog-menu");
		div.toggleClass( 'cd-active', false);
    var lis = $(".blog-box");
    if(instant) lis.each( function() {
      $(this).css({
        transition: "all 0s",
        "transition-delay": "0s"
      });
    });
		lis.each( function( i ) {
			$( this ).css( {
				top : 0,
				left : 0,
				marginLeft : 0,
				opacity : 1,
				transform : 'none',
        "transition-delay": "0s"
			} );
		} );
    this.blogsShown = false;
  }

  this.go = function(region) {
    $state.go('articles.category', {category: this.regioncode[region]});
  }

  $scope.$on('$stateChangeStart', function(){
    this.blogsClose(true);
    this.profileShown = false;
  }.bind(this));

  $scope.$on('refreshUser', function() {
    this.user = CurrentUser.user;
    this.privacy = CurrentUser.user.privacy;
  }.bind(this));

  $scope.$on('loggedIn', function(){
    this.privacy = CurrentUser.user.privacy;
    User.get({id: CurrentUser.user.id, access_token: CurrentUser.accessToken}, function(user) {
      this.user = user;
    }.bind(this));
  }.bind(this));

  $scope.$on('tabChanged', function() {
    this.settingsShown = false;
    if(this.shouldShowProfile) {
      this.showProfile();
      this.shouldShowProfile = false;
    } else {
      this.profileShown = false;
    }
  }.bind(this));

  $scope.$on('showProfile', function() {
    this.shouldShowProfile = true;
  }.bind(this));

});
