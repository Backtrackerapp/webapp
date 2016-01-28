angular.module('utils').directive('mobileCover', function(){
    return {
        restrict: 'E',
        templateUrl: '/modules/utils/directives/mobileCover/main-tmpl.html',
        scope: {},
        controllerAs: 'mobileCtrl',
        controller: function ($scope, $state) {
            var IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
            IS_IPHONE = !IS_IPAD && ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)),
            IS_IOS = IS_IPAD || IS_IPHONE,
            IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null,
            IS_MOBILE = IS_IOS || IS_ANDROID;

            var id = '';
            if($state.current.name === 'map.journey'){
                id = $state.params.id
            }
            $scope.link = "backtrackerapp://"+id;

            if (IS_IOS) {
                window.location = $scope.link;

                // setTimeout(function() {
                //     // If the user is still here, open the App Store
                //     if (!document.webkitHidden) {
                //         // Replace the Apple ID following '/id'
                //         window.location = 'http://itunes.apple.com/app/id979210947';
                //     }
                // }, 25);
            }

            if(IS_IOS){
                $scope.device = "iOS";
            } else if (IS_ANDROID){
                $scope.device = "android";
            } else {
                $scope.device = "other";
            }


        }
    }
});
