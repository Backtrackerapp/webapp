'use strict';

angular.module('conversation')
.controller('ConversationTabsController', function ($scope, $rootScope, Converse, CurrentUser) {
  this.conversations = Converse.conversations;
  this.showBadge = false;

  this.showConversations = function() {
      if(!CurrentUser.loggedIn) {
          $rootScope.$broadcast('loginPanel', {
              where: 'Chat_On_Map'
          });
          return;
      }
    $rootScope.$broadcast('showConversations');
  }

  $scope.$on('conversationsUpdated', function(test, args) {
    if(args.newMessages) {
      this.showBadge = true;
    } else {
      this.showBadge = false;
    }
  }.bind(this));
});
