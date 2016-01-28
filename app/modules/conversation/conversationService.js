'use strict';

angular.module('conversation')
.service('Converse', function(Conversation, CurrentUser, underscore, Mixpanel){
    //I still hate how this work... Must fix one day TODO
    this.conversations = [];


    this.converseWithUser = function(user) {
        Mixpanel.track('Chat_View_Loaded');
        var flag = false;
        underscore.each(this.conversations, function(convo) {
            if(convo.other.id === user.id) {
                this.activateConversation(convo);
                flag = true;
            } else {
                convo.active = false;
            }
        }.bind(this));
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
            Conversation.since({id: newConversation.other.id, last_id: "0"}, function(data) {
                newConversation.loading = false;
                newConversation.messages = data.messages.reverse();
            }, function() {
                newConversation.loading = false;
            }.bind(this));
        }

    };

    this.converse = function(conversation) {
        Mixpanel.track('Chat_View_Loaded');
        if(!underscore.findWhere(this.conversations, {id: conversation.id})) {
            if(this.conversations.length >= 3) {
                this.conversations.pop();
            }
            underscore.each(this.conversations, function(convo) {
                convo.active = false;
            });
            conversation.active = true;
            this.conversations.unshift(conversation);
            conversation.loading = true;
            Conversation.since({id: conversation.other.id, last_id: "0"}, function(data) {
                conversation.loading = false;
                conversation.messages = data.messages.reverse();
            });
        } else {
            this.activateConversation(conversation);
        }
    };

    this.updateAndConverse = function(conversation) {
        if(!underscore.findWhere(this.conversations, {id: conversation.id})) {
            if(this.conversations.length >= 3) {
                this.conversations.pop();
            }
            underscore.each(this.conversations, function(convo) {
                convo.active = false;
            });
            conversation.active = true;
            conversation.loading = true;
            Conversation.since({id: conversation.other.id, last_id: "0"}, function(data) {
                conversation.loading = false;
                conversation.messages = data.messages.reverse();
                this.conversations.unshift(conversation);
            }.bind(this));
        } else {
            var convo = underscore.findWhere(this.conversations, {id: conversation.id});
            var id = underscore.max(convo.messages, function(message) {
                return message.id;
            }).id;
            Conversation.since({id: convo.other.id, last_id: id}, function(data) {
                underscore.each(data.messages.reverse(), function(eachMessage) {
                    convo.messages.push(eachMessage);
                });
                this.activateConversation(convo);
            }.bind(this));
        }
    };

    this.closeConversation = function(conversation) {
        underscore.find(this.conversations, function(item, index) {
            if(item.id === conversation.id) {
                this.conversations.splice(index, 1);
            }
        }.bind(this));
    };

    this.activateConversation = function(conversation) {
        underscore.each(this.conversations, function(convo) {
            if(convo.id === conversation.id) {
                convo.active = true;
            } else {
                convo.active = false;
            }
        });
    };

    this.postMessage = function(conversation, callback) {
        Mixpanel.track('Chat_View_Send_Pressed');
        var message = conversation.newMessageText;
        conversation.newMessageText = "";
        var newMessage = {
            message: message,
            read: false,
            reply: false,
            id: 0,
            pending: true
        };
        if(!conversation.messages) {
            conversation.messages = [];
        }
        conversation.messages.push(newMessage);
        Conversation.message({
            to_id: conversation.other.id,
            message: message
        }, function() {
            this.updateConversation(conversation, newMessage);
            if(callback) {
                callback();
            }
        }.bind(this));
    };

    this.updateConversation = function(conversation, newMessage) {
        var id = underscore.max(conversation.messages, function(message) {
            return message.id;
        }).id;
        Conversation.since({id: conversation.other.id, last_id: id}, function(data) {
            if(newMessage) {
                conversation.messages = underscore.without(conversation.messages, newMessage);
            }
            if(data.messages){
                underscore.each(data.messages.reverse(), function(message) {
                    conversation.messages.push(message);
                });
            }
        });
    };
});
