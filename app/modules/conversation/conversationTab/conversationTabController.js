'use strict';

angular.module('conversation')
.controller('ConversationTabController', function (Converse) {
  // on $scope => conversation
  this.newMessage = ""

  this.resetMessage = function(){
    this.newMessage = "";
  }

  this.closeConversation = function(conversation) {
    Converse.closeConversation(conversation);
  }

  this.activateConversation = function(conversation) {
    if(conversation.active) {
      conversation.active = false;
    } else {
      Converse.activateConversation(conversation);
      Converse.updateConversation(conversation);
    }
  }

  this.submitMessage = function(conversation) {
    if(this.newMessage.length > 0) {
      conversation.newMessageText = this.newMessage;
      Converse.postMessage(conversation, this.resetMessage.bind(this));
    }
  }
});
