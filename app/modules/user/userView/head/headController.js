'use strict';

angular.module('user').controller('headController', function($scope, $rootScope, User, CurrentUser, Converse, Util, $state){
	this.popupShown = false;
	this.infoLoaded = true;
	this.followRequest = false;
	this.profileImage = null;

	$scope.$watch('user', function(newVal, oldVal){
		if(newVal){
			this.profileImage = Util.parseProfileImage(newVal, 40);
		}
	}.bind(this));

	this.goProfile = function(){
		if($state.current.name === 'map.users'){
			console.log($scope.user);
			$rootScope.$broadcast('showFullUser', {user: $scope.user});
		} else {
			$state.go('map.users', {id: $scope.user.id});
		}

	}

	this.unfollow = function(user) {
		this.followRequest = true;
		User.unfollow({
			id:user.id
		},
		function(user){
			this.followRequest = false;
			$scope.user = user;
		}.bind(this),
		function(error){
			this.followRequest = false;
		}.bind(this));
	}

	this.follow = function(user) {
		this.followRequest = true;
		User.follow({
			id:user.id,
			access_token: CurrentUser.accessToken
		},
		function(user){
			this.followRequest = false;
			$scope.user = user;
		}.bind(this),
		function(error){
			this.followRequest = false;
		}.bind(this));
	}

	//Turn this into a service! TODO
	this.blockUser = function(user) {
		$rootScope.$broadcast('showModal', {
			title: "Block " + user.first_name,
			template: "<block-user></block-user>",
			params: { id:user.id }
		});
	}

	this.reportUser = function(user) {
		$rootScope.$broadcast('showModal', {
			title: "Report " + user.first_name,
			template: "<report-user></report-user>",
			params: { id:user.id }
		});
	}

	this.togglePopup = function() {
		if(this.popupShown) {
			this.popupShown = false;
		} else {
			this.popupShown = true;
			//Using jquery is bad!!
			$('.user-view-top .popup').css({left: ($('.user-view-top .btn-darkBlue').offset().left - 28) + 'px'});
			$('.user-view').bind('click', function(e) {
				if(!$(e.target).hasClass('btn-darkBlue') && !$(e.target).hasClass('more-icon')) {
					this.popupShown = false;
					e.stopPropagation();
				}
			}.bind(this));
		}
	}

	this.expand = function() {
		this.infoLoaded = !this.infoLoaded;
		this.popupShown = false;
		$scope.showContent();
	}

	this.chatToUser = function(user) {
		Converse.converseWithUser(user);
	}

	$scope.$on('mapTapped', function() {
		this.popupShown = false;
	}.bind(this));

});
