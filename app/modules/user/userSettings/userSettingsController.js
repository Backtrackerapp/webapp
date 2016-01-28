angular.module('user')
.controller('UserSettingsController', function($scope, User, CurrentUser, $rootScope, Util, Auth, $state, Mixpanel){

    $scope.profile_image = Util.parseProfileImage($scope.user, 100);
    $scope.cover_image = Util.parseCoverImage($scope.user);
    $scope.name = $scope.user.first_name + ' ' + $scope.user.last_name;
    $scope.twitter = $scope.user.twitter || '';
    $scope.facebook = $scope.user.fbpage || '';
    $scope.instagram = $scope.user.instagram || '';
    $scope.website = $scope.user.webpage || '';
    $scope.about = $scope.user.aboutme || '';
    $scope.privacy = $scope.user.privacy;
    $scope.cover_files = [];
    $scope.profile_files = [];
    $scope.error = false;
    $scope.errorText = '';

    $scope.tab = 'info';

    $scope.logout = function(){
        Mixpanel.track('Settings_Logout');
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
        if($scope.facebook.length > 0){ params.fbpage = $scope.facebook; }
        if($scope.instagram.length > 0){ params.instagram = $scope.instagram; }
        if($scope.website.length > 0){ params.webpage = $scope.website; }
        if($scope.about.length > 0){ params.aboutme = $scope.about; }
        if($scope.privacy != $scope.user.privacy ){ params.privacy = $scope.privacy; }

        console.log(params);
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
            Mixpanel.track('Settings_Save', { success: true });
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
            Mixpanel.track('Settings_Save', { success: true });
            $scope.saving = false;
            $scope.errorText = error.data.errors.join(', ');
            $scope.error = true;
        });
    }
});
