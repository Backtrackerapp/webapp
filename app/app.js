'use strict';

(function(){
  var app = angular.module('backtrackerApp',
    [
    //Personal
      'config',
      'utils',
      'nav',
      'slider',
      'modal',
      'user',
      'highlight',
      'journey',
      'conversation',
      'map',
      'states',
      'articles',
      'gallery',

    //Bower_Components
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'facebook',
      'angular-mapbox',
      'simpleFormat',
      'luegg.directives',
      'ngAutocomplete',
      '720kb.datepicker',
      'angularFileUpload'
    ]);

  app.config(function($compileProvider, FacebookProvider){
    // allow for these urls to pass as links
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

    //Set APP ID
    FacebookProvider.init('412307002251243');
  });

  //This will have to look for a accesstoken instead first
	app.run(function(Facebook, CurrentUser){
		Facebook.getLoginStatus(function(response) {
	      if(response.status === 'connected') {
	        CurrentUser.getUser(response.authResponse.accessToken, 'loggedIn');
	      } else {
	        window.location = "http://www.backtrackerapp.com";
	      }
    	});
	});

})();
