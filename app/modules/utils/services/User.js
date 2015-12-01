angular.module('utils')
.service('User', function(Http, apiUrl, $upload) {

    this.current = function(params, success, error){
        var url = apiUrl+"/api/v2/users/current";
        return Http.get(url, params, success, error);
    };

    this.get = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id;
        return Http.get(url, params, success, error);
    }

    this.within = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/within";
        return Http.get(url, params, success, error);
    }

    this.search = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/search";
        return Http.get(url, params, success, error);
    }

    this.suggested = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/suggested";
        return Http.get(url, params, success, error);
    }

    this.search = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/search";
        return Http.get(url, params, success, error);
    }

    this.create = function(params, success, error) {
        var url = apiUrl+"/api/v2/users"
        return Http.post(url, params, success, error);
    }

    //update needs an upload now

    this.accept = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/accept";
        return Http.post(url, params, success, error);
    }

    this.ignore = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/ignore";
        return Http.post(url, params, success, error);
    }

    this.update = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/current";
        return Http.patch(url, params, success, error);
    }

    this.upload = function(file, name, success, error){
        Http.upload(apiUrl+"/api/v2/users/current", file, name, success, error);
    }

    this.followers = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/followers";
        return Http.get(url, params, success, error);
    }

    this.following = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/following";
        return Http.get(url, params, success, error);
    }

    this.follow = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/follow";
        return Http.post(url, params, success, error);
    }

    this.unfollow = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/follow";
        return Http.delete(url, params, success, error);
    }

    this.report = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/report";
        return Http.post(url, params, success, error);
    }

    this.block = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/block";
        return Http.post(url, params, success, error);
    }

    this.unblock = function(params, success, error) {
        var url = apiUrl+"/api/v2/users/"+params.id+"/block";
        return Http.delete(url, params, success, error);
    }
});
