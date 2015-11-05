'use strict';
(function(){
    var app = angular.module('conversation', []);

    app.directive('conversationList', function(){
      return {
        restrict: 'E',
        templateUrl: 'modules/conversation/conversationList/conversationList.html',
        controller: 'ConversationListController',
        controllerAs: 'listCtrl',
        scope: {}
      }
    });

    app.directive('conversationUser', function(){
      return {
        restrict: 'E',
        templateUrl: 'modules/conversation/conversationList/conversationUser.html',
        scope: {
          conversation: '='
        }
      };
    });

    app.directive('conversationTabs', function(){
      return {
        restrict: 'E',
        templateUrl: 'modules/conversation/conversationTabs/conversationTabs.html',
        controller: 'ConversationTabsController',
        controllerAs: 'tabsCtrl',
        scope: {}
      }
    });

    app.directive('conversationTab', function(){
      return {
        restrict: 'E',
        templateUrl: 'modules/conversation/conversationTab/conversationTab.html',
        controller: 'ConversationTabController',
        controllerAs: 'tabCtrl',
        replace: true,
        scope: {
          conversation: "="
        }
      }
    });
})();
