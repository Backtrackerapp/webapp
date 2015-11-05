'use strict';

angular.module('conversation')
.controller('ConversationListController', function ($scope, $rootScope, $interval, CurrentUser, Conversation, Converse) {
  this.shown = false;
  this.conversations = [];


  this.closeConversations = function() {
    this.shown = false;
  }

  this.converse = function(conversation) {
    this.shown = false;
    Converse.converse(conversation);
  }

  this.update = function(){
    var newMessages = false;
    Conversation.query({access_token: CurrentUser.accessToken}, function(conversations) {
      this.conversations = conversations;
      _.each(conversations, function(convo) {
        if(convo.has_unread) {
          newMessages = true;
          Converse.updateAndConverse(convo);
        }
      });
      $rootScope.$broadcast('conversationsUpdated', {newMessages: newMessages});
    }.bind(this));
  }

  $scope.$on('showConversations', function() {
    this.shown = true;
    Conversation.query({access_token: CurrentUser.accessToken}, function(conversations) {
      this.conversations = conversations;
    }.bind(this));
  }.bind(this));

  $scope.$on('tabChanged', function() {
    this.shown = false;
  }.bind(this));

  $scope.$on('loggedIn', this.update.bind(this))

  $interval(this.update.bind(this), 10000);

});
