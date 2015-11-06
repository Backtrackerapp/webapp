'use strict';

angular.module('user')
.directive('listUser', function($location, CurrentUser, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/user/listUser/listUser.html',
        scope: {
            user: "=",
            buttons: "="
        },
        link: function(scope, elem, attrs) {
            elem.bind('click', function(e) {
                //if we didn't click the follow or unfollow link, then show user profile:
                if(!$(e.target).closest('a').length){
                    scope.$apply(function() {
                        if(scope.$eval(attrs.user).id != CurrentUser.user.id) {
                            $location.path('/users/' + scope.$eval(attrs.user).id);
                            $rootScope.$broadcast('hideModal');
                        } else {
                            $location.path('/');
                            $rootScope.$broadcast('showProfile');
                        }
                    });
                }
            });
        },
        controllerAs: 'userCtrl',
        controller: function($scope, User, $rootScope, CurrentUser){
            // on $scope => user

            this.is_me = CurrentUser.user.id == $scope.user.id;

            this.follow = function(user){
                $scope.user.following_status = 'waiting'
                User.follow({
                    id: user.id
                },function(user) {
                    $scope.user.following_status = user.following_status;
                });
            };
            this.unfollow = function(user) {
                $scope.user.following_status = 'waiting'
                User.unfollow({
                    id: user.id
                },function(user) {
                    $scope.user.following_status = user.following_status;
                });
            };
            this.accept = function(user) {
                if(true){
                    User.accept({
                        id: user.id
                    }, function(user){
                        $scope.user.follower_status = user.follower_status;
                        $rootScope.$broadcast('refreshUser');
                    }.bind(this));
                }
            }
        }
    }
});
