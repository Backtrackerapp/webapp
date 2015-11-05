'use strict';

angular.module('utils')
  .service('CurrentUser', function (User, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.accessToken = "";
    this.user = null;
    this.loggedIn = false;

    this.getUser = function(accessToken, message) {
      if(accessToken) this.accessToken = accessToken;
      User.current({
        access_token: this.accessToken
      }, function(data){
        this.user = data;
        var m = 'refreshUser';
        if(!this.loggedIn){
          var m = 'loggedIn';
          this.loggedIn = true;
        }
        $rootScope.$broadcast(m, {});
      }.bind(this));
    }
  });
