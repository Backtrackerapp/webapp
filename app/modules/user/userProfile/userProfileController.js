angular.module('user')
.controller('UserProfileController', function($scope, $state, User, Util, Mixpanel, $rootScope, CurrentUser){
    //on $scope: user
    Mixpanel.track('Profile_show', {
        id: $scope.user.id,
        mine: $scope.user.is_me
    });

    $scope.profile_image = Util.parseProfileImage($scope.user, 100);
    $scope.cover_image = Util.parseCoverImage($scope.user);
    $scope.loading = false;
    $scope.settings = false;
    $scope.fbpage = Util.parseFbPage($scope.user);

    $scope.followRequest = false;

    $scope.content = 0;

    $scope.view = 'journey';

    // function trackLinks(link){
    //     console.log($('.ProfileView a.'+link));
    //     $('.ProfileView a.'+link).on('click', function(){
    //         Mixpanel.track('Social_Button', {type: link});
    //     });
    // }
    //
    // trackLinks('facebook');
    // trackLinks('instagram');
    // trackLinks('twitter');
    // trackLinks('webpage');

    $scope.trackLink = function(link){
        Mixpanel.track('Social_Button', {type: link});
    }

    $scope.left = function(){
        $scope.content = ( ( ($scope.content -1) %3) +3 )%3
    }

    $scope.right = function(){
        $scope.content = ( ( ($scope.content +1) %3) +3 )%3
    }

    $scope.editUser = function(){
        Mixpanel.track('Profile_Settings');
        $scope.settings = true;
    }

    $scope.close = function(){
        $rootScope.$broadcast('close');
    }

    $scope.goJourney = function(journey){
        $state.go('map.journey', {id: journey.id});
    }

    $scope.goUser = function(user){
        $state.go('map.users', {id: user.id});
    }

    $scope.changeView = function(view){
        if(view === 'followers'){
            Mixpanel.track('Profile_Tab', {
                type: 'followers'
            });
            if(!$scope.user.followers) $scope.loading = true;
            User.followers({id: $scope.user.id}, function(data){
                $scope.loading = false;
                $scope.user.followers = data;
            },function(){
                $scope.loading = false;
            });
        } else if(view === 'following'){
            Mixpanel.track('Profile_Tab', {
                type: 'following'
            });
            if(!$scope.user.following) $scope.loading = true;
            User.following({id: $scope.user.id}, function(data){
                $scope.loading = false;
                $scope.user.following = data;
            },function(){
                $scope.loading = false;
            });
        } else if(view === 'journey'){
            Mixpanel.track('Profile_Tab', {
                type: 'journey'
            });
        } else if(view === 'photos'){
            Mixpanel.track('Profile_Tab', {
                type: 'photos'
            });
        }
        $scope.view = view;
    }

    $scope.unfollow = function(user) {
		$scope.followRequest = true;
		User.unfollow({
			id:user.id
		},
		function(user){
			Mixpanel.track('Unfollow_User', {
				where: 'User_Profile'
			});
			$scope.followRequest = false;
			$scope.user = user;
		},
		function(error){
			$scope.followRequest = false;
		});
	}

	$scope.follow = function(user) {
        if(!CurrentUser.loggedIn) {
			$rootScope.$broadcast('loginPanel', {
                where: 'Follow_Profile'
            });
			return;
		}
		$scope.followRequest = true;
		User.follow({
			id:user.id,
			access_token: CurrentUser.accessToken
		},
		function(user){
			Mixpanel.track('Follow_User', {
				where: 'User_Profile'
			});
			$scope.followRequest = false;
			$scope.user = user;
		},
		function(error){
			$scope.followRequest = false;
		});
	}

    $scope.$on('refreshFullUser', function(test, user){
        $scope.user = user;
        $scope.profile_image = Util.parseProfileImage($scope.user, 100);
        $scope.cover_image = Util.parseCoverImage($scope.user);
        $scope.fbpage = Util.parseFbPage($scope.user);
    });

    $scope.$on('logout', function(){
        $scope.user.is_me = false;
    });

});
