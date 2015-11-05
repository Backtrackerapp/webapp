'use strict';

angular.module('utils')
  .directive('htmlinsert',function($compile){
    return {
        scope: {
            htmlinsert: '=',
            params: '=',    
        },
        link: function(scope,element,attrs){
            var render = function(html){
                element.empty();
                var compiledElement = $compile(html)(scope);
                element.append(compiledElement);
            }

            render(scope.htmlinsert);

            scope.$watch('htmlinsert', function(newValue, oldValue){
                render(newValue);
            });
        }
    }
  });