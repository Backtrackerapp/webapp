angular.module('highlight')
.controller('ViewHighlightController', function($scope, $rootScope, $state, debug, CurrentUser, Highlight, Util){
	this.liking = false;
	if($scope.highlight.user) this.profileImage = Util.parseProfileImage($scope.highlight.user, 65);

	var images = {
		"drink": 5,
		"eat": 2,
		"gem": 3,
		"sleep": 3
	}

	var texts = [
		'The camera man was asleep so we have no photos! Send yours to info@backtrackerapp.co.uk',
		'Felix swapped our photos for some Pokemon cards last night. If you visit, please send photos to info@backtrackerapp.co.uk',
		'Henry was rubbish at taking photos. If you visit, please send photos to info@backtrackerapp.co.uk',
		'Dom lost the camera when drunk in La Paz. If you visit, please send photos to info@backtrackerapp.co.uk',
		'We may have misplaced our camera... If you visit please send photos to info@backtrackerapp.co.uk'
	]

	function randomImage(category){
		var max = images[category];
		if(max === undefined){
			return 'sleep3.jpg';
		}
		return category + ( Math.floor(Math.random() * ( max )) + 1) + '.jpg';
	}

	function randomText(){
		return texts[( Math.floor(Math.random() * ( texts.length -1 )) )];
	}

	if($scope.highlight.image.ipad === null){
		$scope.default_image = 'images/highlight_default/'+randomImage($scope.highlight.category);
		$scope.default_text = randomText();
	}


	this.close = function() {
		$scope.$emit('close', {});
	}

	$scope.goUser = function(){
		if($scope.highlight.user){
			$state.go('map.users', {id:$scope.highlight.user.id});
		}
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

	this.suggestHighlight = function() {
		this.close();
		$rootScope.$broadcast('showModal', {
          title: "Suggest Highlight",
          template: "<new-highlight></new-highlight>"
        });
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
