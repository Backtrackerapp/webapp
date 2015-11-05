angular.module('gallery').factory('Gallery', function($resource, apiUrl){
  return $resource(apiUrl+'/api/galleries');
})
