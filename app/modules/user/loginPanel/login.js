'use strict';

angular.module('user')
.controller('LoginController', function ($scope, Auth, Facebook, User, $stateParams, Mixpanel) {
    $scope.show = false;
    $scope.content = 'prompt';

    $scope.first_name = '';
    $scope.last_name = '';
    $scope.email = '';
    $scope.password = '';

    $scope.error = null;

    if($stateParams.login === 't'){
        console.log($stateParams);
        $scope.show = true;
    }

    $scope.contentSignup = function(prompt){
        if(prompt){
            Mixpanel.track('Prompt_Join_Button');
        }
        $scope.content = 'signup';
    }

    $scope.contentLogin = function(){
        $scope.content = 'login';
    }

    $scope.loginFacebook = function(){
        Mixpanel.track('Login', {
            type: 'Email'
        });
        Facebook.login(function(response){
            if(response.status === 'connected'){
                Auth.connectedResponse(response).then(function(data){
                    Mixpanel.identify(data.id);
                });
            }
        });
    }

    $scope.loginEmail = function(){
        Mixpanel.track('Login', {type: 'Email'});
        Auth.loginEmail($scope.email, $scope.password)
        .then(function(data){
            Mixpanel.identify(data.id);
        })
        .catch(function(error){
            console.log(error);
            $scope.error = error.data.errors;
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
            Mixpanel.alias(data.id);
            Mixpanel.track('Create_An_Account', {type: 'Email'});
            Auth.auth(data.auth_token);
        }, function(error){
            $scope.error = error.data.errors;
        });
    }

    $scope.createFacebook = function(){
        Facebook.login(function(response){
            if(response.status === 'connected'){
                User.create({
                    fb_token: response.authResponse.accessToken
                }).then(function(data){
                    Mixpanel.alias(data.id);
                    Mixpanel.track('Create_An_Account', {type: 'Facebook'});
                    Auth.auth(data.auth_token);
                }, function(error){
                    $scope.error = error.data.errors;
                });
            }
        });
    }

    // $('.login-content .facebook').on('click', $scope.loginFacebook);


    $scope.$on('loggedIn', function(){
        $scope.show = false;
    });

    $scope.$on('loginPanel', function(e, args){
        Mixpanel.track('Login_Opened', args);
        if(args.where === 'Nav_Bar'){
            $scope.contentLogin();
        }
        $scope.show = true;
    });
});
