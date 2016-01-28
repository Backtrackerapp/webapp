'use strict';

angular.module('utils')
.service('Auth', function ($rootScope, $cookies, Facebook, $http, apiUrl, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.token = $cookies.auth

    this.storeToken = function(token) {
        $cookies.auth = token;
        this.token = token;
    }


    this.login = function(params){
        return $http({
            method: 'GET',
            url: apiUrl+"/api/v2/login",
            params: params
        })
    };

    this.logout = function(params){
        $cookies.auth = null;
        $rootScope.$broadcast('logout');
        $state.go('map.current');
        document.location.reload();
    }

    this.auth = function(token){
        this.storeToken(token);
        $rootScope.$broadcast('authed');
    }

    this.connectedResponse = function(response){
        return this.login({
            fb_token: response.authResponse.accessToken
        }).then(function(resp){
            this.auth(resp.data.auth_token);
            return resp.data;
        }.bind(this), function(error) {
            console.error("Something went wrong: "+error.errors);
        }.bind(this));
    }

    // this.loginFacebook = function() {
    //     Facebook.getLoginStatus(function(response) {
    //         if(response.status === 'connected') {
    //             this.connectedResponse(response)
    //         }
    //     }.bind(this));
    // }

    this.loginEmail = function(email, password){
        return this.login({
            email: email,
            password: password
        }).then(function(resp){
            this.auth(resp.data.auth_token);
            return resp.data;
        }.bind(this));
    }
});
