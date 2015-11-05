angular.module('utils')
.directive('step', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attr){
			scope.shown = attr.shown;
			setStep(scope.step);
			scope.$watch('step', setStep.bind(this));

			function setStep(step){
				element.toggleClass('shown', scope.shown == scope.step);
				element.toggleClass('prev', (scope.shown+1) == scope.step);
				element.toggleClass('next', (scope.shown-1) == scope.step);
			}
		},
		scope: {
			step: '='
		}
	}
})