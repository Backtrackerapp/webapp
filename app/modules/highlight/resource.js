'use strict';

angular.module('highlight').factory('Highlight', function($resource, apiUrl) {
  return $resource(apiUrl+'/api/highlights', {id: '@id'}, {
    within: {
      method: 'GET',
      url: apiUrl+"/api/highlights/within",
      isArray: true
    },
    like: {
      method: 'POST',
      url: apiUrl+'/api/highlights/:id/like'
    },
    dislike: {
      method: 'DELETE',
      url: apiUrl+'/api/highlights/:id/like'
    },
    report: {
      method: 'POST',
      url: apiUrl+'/api/highlights/:id/report'
    }
  })
});