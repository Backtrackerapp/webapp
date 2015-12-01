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
        'best-trips',
        'map',
        'states',

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
        'angularFileUpload',
        'ngUnderscore'
    ]);

    app.config(function($compileProvider, FacebookProvider){
        // allow for these urls to pass as links
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

        //Set APP ID
        FacebookProvider.init('412307002251243');
    });

    //This will have to look for a accesstoken instead first
    app.run(function(Auth, CurrentUser){
        // Auth.loginFacebook();
    });

})();
