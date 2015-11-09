'use strict';

(function(){
	var app = angular.module("nav", []);

	app.directive("navBar", function(){
		return {
			restrict: 'E',
			controller: 'NavController',
			controllerAs: 'navCtrl',
			templateUrl: 'modules/nav/navBar/navBar.html',
			scope: {}
		};
	});

	app.directive("segmentBar", function(){
		return {
			restrict: 'E',
			controller: 'SegmentedController',
			controllerAs: 'segCtrl',
			templateUrl: 'modules/nav/segmentBar/segmented.html',
			scope: {}
		};
	});

	app.directive("actionButton", function(){
		return {
			restrict: 'E',
			controller: 'ActionButtonController',
			controllerAs: 'actionCtrl',
			templateUrl: 'modules/nav/actionButton/actionButton.html',
			scope: {}
		};
	});

	app.directive("navMenu", function(){
		return {
			restrict: 'E',
			controller: 'NavMenuController',
			controllerAs: 'navCtrl',
			templateUrl: 'modules/nav/navMenu/navMenu.html',
			link: function(scope, element){
				var menu = element.find('.navMenu');
				var resize = function(){
					menu.css('max-height', window.innerHeight - 60)
				}
				resize();
				window.addEventListener( "resize", resize);

			},
			scope: {
				show: "=",
				hover: "="
			}
		};
	});
})();
