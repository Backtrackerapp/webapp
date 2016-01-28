'use strict';

angular.module('nav')
.controller('NavMenuController', function ($scope, $rootScope, Mixpanel, $state, CurrentUser) {
    this.chat = function(){
        $scope.show = false;
        $rootScope.$broadcast('showConversations')
    }

    function trackLinks(link){
        $('.navMenu a.'+link).click(function(){
            Mixpanel.track('Nav_Menu_'+link);
        });
    }

    $scope.goFriends = function(){
        if(!CurrentUser.loggedIn) {
            $rootScope.$broadcast('loginPanel', {
                where: 'Friends_Menu'
            });
            return;
        }
        $state.go('map.friends')
    }

    trackLinks('journey');
    trackLinks('highlight');
    trackLinks('best-trip');
    trackLinks('friends');
    trackLinks('profile');
    trackLinks('chat');
    trackLinks('articles');
    trackLinks('gallery');
});
