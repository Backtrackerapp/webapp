angular.module('highlight')
.controller('ViewHighlightController', function($scope, $rootScope, $state, debug, CurrentUser, Highlight, Util, Mixpanel){
	this.liking = false;
	Mixpanel.track('Highlights_Open', {
		id: $scope.highlight.id,
		company: $scope.highlight.company
	});
	if($scope.highlight.user) this.profileImage = Util.parseProfileImage($scope.highlight.user, 65);

	var images = {
		"drink": 5,
		"eat": 2,
		"gem": 3,
		"sleep": 3
	}

	var sub_categories = {
		"ski": "gem",
		"beach": "gem",
		"pub": "drink",
		"club": "drink",
		"bar": "drink",
		"market": "eat",
		"restaurant": "eat",
		"cafe": "eat",
		"eat": "eat",
		"drink": "drink",
		"gem": "gem",
		"sleep": "sleep"
	}

	var texts = [
		'The camera man was asleep so we have no photos! Send yours to info@backtrackerapp.co.uk',
		'Felix swapped our photos for some Pokemon cards last night. If you visit, please send photos to info@backtrackerapp.co.uk',
		'Henry was rubbish at taking photos. If you visit, please send photos to info@backtrackerapp.co.uk',
		'Dom lost the camera when drunk in La Paz. If you visit, please send photos to info@backtrackerapp.co.uk',
		'We may have misplaced our camera... If you visit please send photos to info@backtrackerapp.co.uk'
	]

	    $('.selected-highlight-view a.btn-highlight-website').on('click', function(){
            Mixpanel.track('Highlight_View_Website');
        });

	function randomImage(category){
		var c = sub_categories[category];
		console.log(c);
		var max = images[c];
		if(max === undefined){
			return 'sleep3.jpg';
		}
		return c + ( Math.floor(Math.random() * ( max )) + 1) + '.jpg';
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
		Mixpanel.track('Highlight_User_Selected');
		if($scope.highlight.user){
			$state.go('map.users', {id:$scope.highlight.user.id});
		}
	}

	this.like = function(highlight) {
		if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Like_Highlight'
            });
			return;
		}
		this.liking = true;
		if(highlight.liked) {
			Mixpanel.track('Highlight_Unlike')
			Highlight.dislike({
				id: highlight.id,
				access_token: CurrentUser.accessToken
			}, function(data){
				this.liking = false;
				highlight.liked = false;
				highlight.likes_count--;
			}.bind(this));
		} else {
			Mixpanel.track('Highlight_Like')
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
		if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Suggest_Highlight_View'
            });
			return;
		}
		Mixpanel.track('Highlights_Suggest_Highlight', {
			where: 'View_Highlight'
		});
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
