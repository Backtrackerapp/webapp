angular.module('utils')
.service('Journey', function(Http , $upload, apiUrl){

    this.get = function(params, success, error){
        var url = apiUrl+"/api/v2/journeys/"+params.id;
        return Http.get(url, params, success, error);
    }

    this.current = function(params, success, error){
        var url = apiUrl+"/api/v2/journeys/current";
        return Http.get(url, params, success, error);
    }

    this.remove = {
        post: function(params, success, error){
            var url = apiUrl+'/api/v2/journeys/'+params.journey_id+'/posts/'+params.post_id;
            return Http.delete(url, params, success, error);
        }
    }

    this.post = function(params, success, error, file, progress){
        if(params.journey_id === 0) this.newJourney(params, success, error, file, progress);
        else this.newPost(params, success, error, file, progress);
    }

    this.newJourney = function(params, success, error, file, progress){
        var url = apiUrl+'/api/v2/journeys/'
        if(file) {
            $upload.upload({
                url: url,
                method: 'POST',
                fields: params,
                file: file,
                fileFormDataName: 'cover',
                headers: this.header()
            })
            .progress(progress)
            .success(success)
            .error(error)
        } else {
            Http.post(url, params, success, error);
        }
    }

    this.newPost = function(params, success, error, file, progress){
        var url = apiUrl+'/api/v2/journeys/' + params.journey_id + '/posts/'
        if(file) {
            $upload.upload({
                url: url,
                method: 'POST',
                fields: params,
                file: file,
                fileFormDataName: 'cover',
                headers: this.header()
            })
            .progress(progress)
            .success(success)
            .error(error)
        } else {
            Http.post(url, params, success, error);
        }
    }

    this.edit = function(post, success, error, file, progress){
        //If file is given upload!!
        var url = apiUrl+'/api/journeys/' + post.journey_id + '/posts/' + post.id
        if(file) {
            $upload.upload({
                url: url,
                method: 'PATCH',
                fields: {
                    text: post.text,
                    date: post.date,
                    access_token: CurrentUser.accessToken
                },
                file: file,
                fileFormDataName: 'cover'
            })
            .progress(progress)
            .success(success)
            .error(error)
        } else {
            Http.patch(url, {
                text: post.text,
                date: post.date,
                access_token: CurrentUser.accessToken
            }, success, error);
        }
    }
});
