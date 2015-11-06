angular.module('utils')
.service('Conversation', function(Http, apiUrl) {

    this.since = function(params, success, error){
        var url = apiUrl+"/api/v2/conversations/sinceid";
        return Http.get(url, params, success, error);
    };

    this.list = function(params, success, error){
        var url = apiUrl+"/api/v2/conversations/";
        return Http.get(url, params, success, error);
    };

    this.message = function(params, success, error){
        var url = apiUrl+"/api/v2/conversations/";
        return Http.post(url, params, success, error);
    }
});
