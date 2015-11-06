'use strict';

angular.module('nav')
.controller('ActionButtonController', function ($scope, $rootScope) {

    this.active = 'journey';
    this.shown = true;

    this.action = function() {
        $rootScope.$broadcast('actionButtonPressed', {
            tab: this.active
        });
    };

    $scope.$on('tabChanged', function(test, args) {
        this.active = args.tab;
    }.bind(this));

    $scope.$on('hideChrome', function() {
        this.shown = false;
    }.bind(this));

    $scope.$on('showChrome', function() {
        this.shown = true;
    }.bind(this));

});
