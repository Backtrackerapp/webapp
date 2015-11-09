'use strict';

angular.module('utils')
.service('Auth', function ($rootScope, $cookies, Facebook, $http, apiUrl) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.token = $cookies.auth

    console.log(this.token);

    this.storeToken = function(token) {
        $cookies.auth = token;
        this.token = token;
    }


    this.login = function(params){
        return $http({
            method: 'GET',
            url: apiUrl+"/api/v2/login",
            params: params
        });
    };

    this.logout = function(params){
        $cookies.auth = null;
        $rootScope.$broadcast('logout');
    }


    this.loginFacebook = function() {
        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                this.login({
                    fb_token: response.authResponse.accessToken
                }).then(function(resp){
                    this.storeToken(resp.data.auth_token);
                    $rootScope.$broadcast('authed');
                }.bind(this), function(error) {
                    console.error("Something went wrong: "+error.errors);
                }.bind(this));
            }
        }.bind(this));
    }
});
