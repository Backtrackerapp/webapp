angular.module('journey')
.service('Journey', function($http, apiUrl, $upload, CurrentUser, debug){
	this.get = function(params, success, error){
		var url = apiUrl+"/api/journeys/"+params.id;
		if(params.access_token) url += "?access_token="+params.access_token;
		$http.get(url, params)
		.success(success)
		.error(error);
	}

	this.current = function(params, success, error){
		$http.get(apiUrl+"/api/journeys/current?access_token="+params.access_token)
			.success(success)
			.error(error)
	}

	this.remove = {
		post: function(params, success, error){
			$http.delete(apiUrl+'/api/journeys/'+params.journey_id+'/posts/'+params.post_id+'?access_token='+params.access_token)
			.success(success)
			.error(error);
		}
	}

	this.post = function(params, success, error, file, progress){
		if(params.journey_id === 0) this.newJourney(params, success, error, file, progress);
		else this.newPost(params, success, error, file, progress);
	}

	this.newJourney = function(params, success, error, file, progress){
		var url = apiUrl+'/api/journeys/'
		if(file) {
	    $upload.upload({
	      url: url,
	      method: 'POST',
	      fields: params,
	      file: file,
	      fileFormDataName: 'cover'
	    })
	    .progress(progress)
	    .success(success)
	    .error(error)
	  } else {
	    $http.post(url, params)
	    .success(success)
	    .error(error);
	  }
	}

	this.newPost = function(params, success, error, file, progress){
		var url = apiUrl+'/api/journeys/' + params.journey_id + '/posts/'
		if(file) {
	    $upload.upload({
	      url: url,
	      method: 'POST',
	      fields: params,
	      file: file,
	      fileFormDataName: 'cover'
	    })
	    .progress(progress)
	    .success(success)
	    .error(error)
	  } else {
	    $http.post(url, params)
	    .success(success)
	    .error(error);
	  }
	}

	this.ghost = function(params, success, error){
		var url = apiUrl+'/api/journeys/' + params.journey_id + '/ghost';
		$http.post(url, params)
		.success(success)
		.error(error);
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
	    $http.patch(url, {
	      text: post.text,
	      date: post.date,
	      access_token: CurrentUser.accessToken
	    })
	    .success(success)
	    .error(error);
	  }
	}
});
