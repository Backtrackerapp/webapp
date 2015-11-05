'use strict';

angular.module('conversation')
.controller('ConversationTabsController', function ($scope, $rootScope, Converse) {
  this.conversations = Converse.conversations;
  this.showBadge = false;

  this.showConversations = function() {
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
