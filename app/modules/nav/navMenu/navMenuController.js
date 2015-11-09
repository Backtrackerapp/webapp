'use strict';

angular.module('nav')
.controller('NavMenuController', function ($scope, $rootScope) {
    this.chat = function(){
        $scope.show = false;
        $rootScope.$broadcast('showConversations')
    }
});
