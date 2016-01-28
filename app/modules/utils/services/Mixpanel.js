angular.module('utils')
.service('Mixpanel', function($mixpanel, CurrentUser, $rootScope, Auth) {
    this.track = function(event, props){
        var obj = props || {};
        if(Auth.token && Auth.token != 'null'){
            obj.logged_in = true;
        } else {
            obj.logged_in = false;
        }
        return $mixpanel.track(event, obj);
    }

    this.identify = function(id){
        var x = id || CurrentUser.user.id;
        $mixpanel.identify(x);
    }

    this.alias = function(id){
        var x = id || CurrentUser.user.id;
        $mixpanel.alias(x);
    }

    $rootScope.$on('loggedIn', function(){
        $mixpanel.identify(CurrentUser.user.id);
        $mixpanel.people.set({
            $email: CurrentUser.user.email,
            $first_name: CurrentUser.user.first_name,
            $last_name: CurrentUser.user.last_name
        });
    });
});
