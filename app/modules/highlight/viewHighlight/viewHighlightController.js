angular.module('highlight')
.controller('ViewHighlightController', function($scope, $rootScope, $timeout, debug, CurrentUser, Highlight){
	this.liking = false;

	this.close = function() {
		$scope.$emit('close', {});
	}

	this.like = function(highlight) {
		this.liking = true;
		if(highlight.liked) {
			Highlight.dislike({
				id: highlight.id,
				access_token: CurrentUser.accessToken
			}, function(data){
				this.liking = false;
				highlight.liked = false;
				highlight.likes_count--;
			}.bind(this));
		} else {
			Highlight.like({
				id: highlight.id,
				access_token: CurrentUser.accessToken
			}, function(data){
				this.liking = false;
				highlight.liked = true;
				highlight.likes_count++;
			}.bind(this));
		}
	}

	//Turn this into a modalservice... TODO
	this.reportHighlight = function(highlight) {
		$rootScope.$broadcast('showModal', {
			title: 'Report Highlight',
			template: '<report-highlight></report-highlight>',
			params: {id: highlight.id}
		});
	}
});
