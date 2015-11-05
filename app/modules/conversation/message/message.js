'use strict';
angular.module('conversation')
.directive('message', function(Helper) {
  return {
    restrict: 'E',
    templateUrl: 'modules/conversation/message/message.html',
    link: function(scope,ele,attrs){
    	scope.message.created_at = Helper.formatDate(scope.message.created_at);
    },
    scope: {
      message: "="
    }
  }
});
