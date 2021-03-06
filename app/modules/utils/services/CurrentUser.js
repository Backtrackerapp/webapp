'use strict';

angular.module('utils')
.service('CurrentUser', function (User, $rootScope, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.user = null;
    this.loggedIn = false;


    this.getUser = function(returning) {
        User.current(null, function(data){
            this.user = data;
            var m = 'refreshUser';
            if(!this.loggedIn){
                m = 'loggedIn';
                this.loggedIn = true;
            }
            $rootScope.$broadcast(m, {});
        }.bind(this), function(err){
        })
    };

    if(Auth.token != 'null'){
        this.getUser();
    }

    $rootScope.$on('authed', this.getUser.bind(this));
    $rootScope.$on('logout', function(){
        this.user = null;
        this.loggedIn = false;
    }.bind(this));
});
