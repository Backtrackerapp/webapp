angular.module('user').factory('User', function($resource, apiUrl) {
  return $resource(apiUrl+'/api/users/:id', {id: '@id'}, {
    current: {
      method: 'GET',
      url: apiUrl+"/api/users/current",
      isArray: false
    },
    within: {
      method: 'GET',
      url: apiUrl+"/api/users/within",
      isArray: true
    },
    search: {
      method: 'GET',
      url: apiUrl+"/api/users/search",
      isArray: true
    },
    suggested: {
      method: 'GET',
      url: apiUrl+"/api/users/suggested",
      isArray: true
    },
    followers: {
      method: 'GET',
      url: apiUrl+"/api/users/:id/followers",
      isArray: true
    },
    following: {
      method: 'GET',
      url: apiUrl+"/api/users/:id/following",
      isArray: true
    },
    update: {
      method: 'POST',
      url: apiUrl+'/api/users/update_current'
    },
    follow: {
      method: 'POST',
      url: apiUrl+'/api/users/:id/follow'
    },
    unfollow: {
      method: 'DELETE',
      url: apiUrl+'/api/users/:id/follow'
    },
    report: {
      method: 'POST',
      url: apiUrl+'/api/users/:id/report'
    },
    block: {
      method: 'POST',
      url: apiUrl+'/api/users/:id/block'
    }
  });
});