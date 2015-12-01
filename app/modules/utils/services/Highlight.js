'use strict';

angular.module('utils')
.service('Highlight', function(Http, apiUrl) {

    this.save = function(params, success, error){
        var url = apiUrl+'/api/v2/highlights'
        return Http.post(url, params, success, error);
    }

    this.show = function(params, success, error){
        var url = apiUrl+"/api/v2/highlights/"+params.id
        return Http.get(url, params, success, error);
    }

    this.within = function(params, success, error) {
        var url = apiUrl+"/api/v3/highlights/within";
        return Http.get(url, params, success, error);
    }

    this.like = function(params, success, error) {
        var url = apiUrl+'/api/v2/highlights/'+params.id+'/like';
        return Http.post(url, params, success, error);
    }

    this.dislike = function(params, success, error) {
        var url = apiUrl+'/api/v2/highlights/'+params.id+'/like';
        return Http.delete(url, params, success, error);
    }

    this.report = function(params, success, error) {
        var url = apiUrl+'/api/v2/highlights/'+params.id+'/report';
        return Http.post(url, params, success, error);
    }

});
