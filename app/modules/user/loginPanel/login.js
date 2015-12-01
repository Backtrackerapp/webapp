'use strict';

angular.module('user')
.controller('LoginController', function ($scope, Auth, Facebook, User) {
    $scope.show = false;
    $scope.content = 'signup';

    $scope.first_name = '';
    $scope.last_name = '';
    $scope.email = '';
    $scope.password = '';

    $scope.loginFacebook = function(){
        Facebook.login(function(response){
            if(response.status === 'connected'){
                Auth.connectedResponse(response);
            }
        });
    }

    $scope.loginEmail = function(){
        Auth.loginEmail($scope.email, $scope.password).catch(function(error){
            console.log(error);
        });
    }

    $scope.createEmail = function(){
        User.create({
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            email: $scope.email,
            password: $scope.password,
            privacy: 'green'
        }).then(function(data){
            Auth.auth(data.auth_token);
        });
    }

    $scope.createFacebook = function(){
        Facebook.login(function(response){
            if(response.status === 'connected'){
                User.create({
                    fb_token: response.authResponse.accessToken
                }).then(function(data){
                    Auth.auth(data.auth_token);
                });
            }
        });
    }

    // $('.login-content .facebook').on('click', $scope.loginFacebook);


    $scope.$on('authed', function(){
        $scope.show = false;
    });

    $scope.$on('loginPanel', function(){
        $scope.show = true;
    });
});
