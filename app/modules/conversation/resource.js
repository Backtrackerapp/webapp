angular.module('conversation')
.factory('Conversation', function($resource, apiUrl) {
  return $resource(apiUrl+'/api/conversations/:id', {}, {
    since: {
      method: 'GET',
      url: apiUrl+"/api/conversations/:id/sinceid",
      isArray: true
    },
    message: {
      method: 'POST',
      url: apiUrl+"/api/messages"
    }
  });
});
