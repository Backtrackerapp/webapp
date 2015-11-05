angular.module('conversation')
.service('Converse', function(Conversation, CurrentUser){
  //I still hate how this work... Must fix one day TODO
  this.conversations = [];


  this.converseWithUser = function(user) {
    var flag = false;
    _.each(this.conversations, function(convo) {
      if(convo.other.id == user.id) {
        this.activateConversation(convo);
        flag = true;
      } else {
        convo.active = false;
      }
    }.bind(this))
    if(!flag) {
      var newConversation = {
        other: user
      };
      if(this.conversations.length >= 3){
        this.conversations.pop();
      }
      this.conversations.unshift(newConversation);
      newConversation.loading = true;
      newConversation.active = true;
      Conversation.since({id: newConversation.other.id, access_token: CurrentUser.accessToken, last_id: "0"}, function(messages) {
        newConversation.loading = false;
        newConversation.messages = messages.reverse();
      }, function() {
        newConversation.loading = false;
      });
    }

  }

  this.converse = function(conversation) {
    if(!_.findWhere(this.conversations, {id: conversation.id})) {
      if(this.conversations.length >= 3) {
        this.conversations.pop();
      }
      _.each(this.conversations, function(convo) {
        convo.active = false;
      })
      conversation.active = true;
      this.conversations.unshift(conversation);
      conversation.loading = true;
      Conversation.since({id: conversation.other.id, access_token: CurrentUser.accessToken, last_id: "0"}, function(messages) {
        conversation.loading = false;
        conversation.messages = messages.reverse();
      })
    } else {
      this.activateConversation(conversation);
    }
  }

  this.updateAndConverse = function(conversation) {
    if(!_.findWhere(this.conversations, {id: conversation.id})) {
      if(this.conversations.length >= 3) {
        this.conversations.pop();
      }
      _.each(this.conversations, function(convo) {
        convo.active = false;
      })
      conversation.active = true;
      conversation.loading = true;
      Conversation.since({id: conversation.other.id, access_token: CurrentUser.accessToken, last_id: "0"}, function(messages) {
        conversation.loading = false;
        conversation.messages = messages.reverse();
        this.conversations.unshift(conversation);
      });
    } else {
      var conversation = _.findWhere(this.conversations, {id: conversation.id});
      var id = _.max(conversation.messages, function(message) {
        return message.id;
      }).id;
      Conversation.since({id: conversation.other.id, access_token: CurrentUser.accessToken, last_id: id}, function(messages) {
        _.each(messages.reverse(), function(eachMessage) {
          conversation.messages.push(eachMessage);
        });
        this.activateConversation(conversation);
      });
    }
  }

  this.closeConversation = function(conversation) {
    _.find(this.conversations, function(item, index) {
      if(item.id == conversation.id) {
        this.conversations.splice(index, 1);
      }
    }.bind(this));
  }

  this.activateConversation = function(conversation) {
    _.each(this.conversations, function(convo) {
      if(convo.id == conversation.id) {
        convo.active = true;
      } else {
        convo.active = false;
      }
    });
  }

  this.postMessage = function(conversation, callback) {
    var message = conversation.newMessageText;
    conversation.newMessageText = "";
    var newMessage = {
      message: message,
      read: false,
      reply: false,
      id: 0,
      pending: true
    }
    if(!conversation.messages) {
      conversation.messages = [];
    }
    conversation.messages.push(newMessage);
    Conversation.message({
      to_id: conversation.other.id,
      message: message,
      access_token: CurrentUser.accessToken
    }, function() {
      this.updateConversation(conversation, newMessage);
      if(callback) callback();
    }.bind(this))
  }

  this.updateConversation = function(conversation, newMessage) {
    var id = _.max(conversation.messages, function(message) {
      return message.id;
    }).id;
    Conversation.since({id: conversation.other.id, access_token: CurrentUser.accessToken, last_id: id}, function(messages) {
      if(newMessage) {
        conversation.messages = _.without(conversation.messages, newMessage)
      }
      _.each(messages.reverse(), function(message) {
        conversation.messages.push(message);
      });
    })
  }
});
