angular.module('user')
.controller('UserProfileController', function($scope, $state, User, Util){
    //on $scope: user

    $scope.profile_image = Util.parseProfileImage($scope.user, 100);
    $scope.cover_image = Util.parseCoverImage($scope.user);
    $scope.loading = false;
    $scope.settings = false;
    $scope.fbpage = Util.parseFbPage($scope.user);

    $scope.content = 1;

    $scope.view = 'journey';

    $scope.left = function(){
        $scope.content = ( ( ($scope.content -1) %3) +3 )%3
    }

    $scope.right = function(){
        $scope.content = ( ( ($scope.content +1) %3) +3 )%3
    }

    $scope.editUser = function(){
        $scope.settings = true;
    }

    $scope.goJourney = function(journey){
        $state.go('map.journey', {id: journey.id});
    }

    $scope.goUser = function(user){
        $state.go('map.users', {id: user.id});
    }

    $scope.changeView = function(view){
        if(view === 'followers'){
            if(!$scope.user.followers) $scope.loading = true;
            User.followers({id: $scope.user.id}, function(data){
                $scope.loading = false;
                $scope.user.followers = data;
            },function(){
                $scope.loading = false;
            });
        } else if(view === 'following'){
            if(!$scope.user.following) $scope.loading = true;
            User.following({id: $scope.user.id}, function(data){
                $scope.loading = false;
                $scope.user.following = data;
            },function(){
                $scope.loading = false;
            });
        }
        $scope.view = view;
    }

    $scope.$on('refreshFullUser', function(test, user){
        $scope.user = user;
        $scope.profile_image = Util.parseProfileImage($scope.user, 100);
        $scope.cover_image = Util.parseCoverImage($scope.user);
    });

    $scope.$on('logout', function(){
        $scope.user.is_me = false;
    });

});
