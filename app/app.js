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
        'ngUnderscore',
        'analytics.mixpanel'
    ]);

    app.config(function($compileProvider, FacebookProvider, $mixpanelProvider, mixpanel){
        // allow for these urls to pass as links
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

        //Set APP ID
        FacebookProvider.init('412307002251243');

        //Mixpanel key
        $mixpanelProvider.apiKey(mixpanel);
    });

    //This will have to look for a accesstoken instead first
    app.run(function(Auth, CurrentUser, Mixpanel){
        var loc = window.location.hash.split('?')[0].split('/')[1] || 'current_journey';
        Mixpanel.track('App_Opened', { where: loc });

        // var IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
        //     IS_IPHONE = !IS_IPAD && ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)),
        //     IS_IOS = IS_IPAD || IS_IPHONE,
        //     IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null,
        //     IS_MOBILE = IS_IOS || IS_ANDROID;
        //
        // function open() {
        //     // If it's not an universal app, use IS_IPAD or IS_IPHONE
        //     if (IS_IPHONE) {
        //         window.location = "backtrackerapp://";
        //         setTimeout(function() {
        //             // If the user is still here, open the App Store
        //             if (!document.webkitHidden) {
        //                 // Replace the Apple ID following '/id'
        //                 window.location = 'http://itunes.apple.com/app/id979210947';
        //             }
        //         }, 25);
        //     }
        // }
        // open();
    });

})();
