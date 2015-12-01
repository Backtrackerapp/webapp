angular.module('user')
.controller('UserSettingsController', function($scope, User, CurrentUser, $rootScope, Util, Auth, $state){

    $scope.profile_image = Util.parseProfileImage($scope.user, 100);
    $scope.cover_image = Util.parseCoverImage($scope.user);
    $scope.name = '';
    $scope.twitter = '';
    $scope.facebook = '';
    $scope.instagram = '';
    $scope.website = '';
    $scope.about = '';
    $scope.privacy = $scope.user.privacy;
    $scope.cover_files = [];
    $scope.profile_files = [];
    $scope.error = false;
    $scope.errorText = '';

    $scope.tab = 'info';

    $scope.logout = function(){
        Auth.logout();
        $scope.$parent.settings = false;
    }

    function update(params){
        return new Promise(function(resolve, reject){
            User.update(params, resolve, reject);
        })
    }

    function upload(file, name){
        return new Promise(function(resolve, reject){
            User.upload(file, name, resolve, reject);
        });
    }

    $scope.save = function(){
        var params = {};
        if($scope.name.length > 0){
            var arr = [],                           //new storage
                str = $scope.name.split(' ');     //split by spaces
            arr.push(str.shift());                 //add the number
            arr.push(str.join(' '));
            params.first_name = arr[0];
            params.last_name = arr[1];
        }
        if($scope.twitter.length > 0){ params.twitter = $scope.twitter; }
        if($scope.facebook.length > 0){ params.facebook = $scope.facebook; }
        if($scope.instagram.length > 0){ params.instagram = $scope.instagram; }
        if($scope.website.length > 0){ params.website = $scope.website; }
        if($scope.about.length > 0){ params.aboutme = $scope.about; }
        if($scope.privacy != $scope.user.privacy ){ params.privacy = $scope.privacy; }

        var promises = [update(params)];
        if($scope.cover_files.length > 0){
            promises.push(upload($scope.cover_files[0], 'cover_image'))
        }
        if($scope.profile_files.length > 0){
            promises.push(upload($scope.profile_files[0], 'profile_image'))
        }
        $scope.saving = true;
        $scope.error = false;
        Promise.all(promises).then(function(resolve){
            $scope.saving = false;
            $scope.user = resolve[0];
            if(resolve.length > 1){
                $scope.cover_files = [];
                $scope.profile_files = [];
                User.get({id: resolve[0].id}, function(data){
                    $rootScope.$broadcast('refreshFullUser', data);
                    $scope.profile_image = Util.parseProfileImage($scope.user, 100);
                    $scope.cover_image = Util.parseCoverImage($scope.user);
                })
            } else {
                $rootScope.$broadcast('refreshFullUser', resolve[0]);
            }
            console.log(resolve);
        }, function(error){
            $scope.saving = false;
            $scope.errorText = error.data.errors.join(', ');
            $scope.error = true;
        });
    }
});
