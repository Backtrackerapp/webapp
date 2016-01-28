'use strict';

angular.module('conversation')
.controller('ConversationListController', function ($scope, $rootScope, $interval, CurrentUser, Conversation, Converse, underscore, Mixpanel) {
    this.shown = false;
    this.conversations = [];


    this.closeConversations = function() {
        this.shown = false;
    };

    this.converse = function(conversation) {
        this.shown = false;
        Converse.converse(conversation);
    };

    this.update = function(){
        var newMessages = false;
        Conversation.list(null, function(data) {
            this.conversations = data.conversations;
            underscore.each(this.conversations, function(convo) {
                if(convo.has_unread) {
                    newMessages = true;
                    Converse.updateAndConverse(convo);
                }
            });
            $rootScope.$broadcast('conversationsUpdated', {newMessages: newMessages});
        }.bind(this));
    };

    $scope.$on('showConversations', function() {
        this.shown = true;
        Mixpanel.track('Chat_List_View_Load');
        if(CurrentUser.loggedIn){
            Conversation.list(null, function(data) {
                this.conversations = data.conversations;
            }.bind(this));
        }
    }.bind(this));

    $scope.$on('tabChanged', function() {
        this.shown = false;
    }.bind(this));

    $scope.$on('loggedIn', function(){
        this.update();
        $interval(this.update.bind(this), 10000);
    }.bind(this));

});
