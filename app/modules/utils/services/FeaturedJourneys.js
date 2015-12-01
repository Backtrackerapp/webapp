angular.module('utils')
.service('Featured', function(Http , $upload, apiUrl){
    this.list = function(params, success, error){
        var url = apiUrl+"/api/v2/featured_journeys/"
        return Http.get(url, params, success, error);
    }

});
