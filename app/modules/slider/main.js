(function(){
	var app = angular.module("slider", []);

	app.directive('slider', function(){
		return {
			restrict: 'E',
			controller: 'SliderController',
			controllerAs: 'sliderCtrl',
			templateUrl: 'modules/slider/slider.html',
			scope: {}
		}
	});
	
})();