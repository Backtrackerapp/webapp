angular.module('articles')
.factory('Articles', function($resource, apiUrl){
  return $resource(apiUrl+'/api/articles', {}, {
    show: {
      method: 'GET',
      url: apiUrl+'/api/articles/:id'
    },
    category: {
      method: 'GET',
      url: apiUrl+'/api/articles/category',
      isArray: true
    }
  });
});
