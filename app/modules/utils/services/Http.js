angular.module('utils')
.service('Http', function($http, Auth, $upload){

    this.header = function(){
        if(Auth.token){
            return {
                'X-BACKTRACKER-AUTH': Auth.token
            }
        }
        return {};
    }

    this.http = function(method, params, url, success, error){
        return $http({
            method: method,
            url: url,
            headers: this.header(),
            params: params
        }).then(function(response){
            return response.data;
        }).then(success, error);
    }

    this.upload = function(url, file, name, success, error){
        $upload.upload({
            url: url,
            method: 'PATCH',
            file: file,
            fileFormDataName: name,
            headers: this.header()
        }).success(success).error(error)
    }

    this.get = function(url, params, success, error){
        return this.http('GET', params, url, success, error);
    }

    this.post = function(url, params, success, error){
        return this.http('POST', params, url, success, error);
    }

    this.delete = function(url, params, success, error){
        return this.http('DELETE', params, url, success, error);
    }

    this.patch = function(url, params, success, error){
        return this.http('PATCH', params, url, success, error);
    }
});
