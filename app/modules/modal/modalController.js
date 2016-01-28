'use strict';

angular.module('modal')
.controller('ModalController', function ($scope) {
    this.shown = false;
    this.title = "";
    this.template = "";
    this.params = null;

    //remember to change Css to not classes

    this.showModal = function(title, template, params){
        this.title = title;
        this.template = template;

        params.close = this.hideModal.bind(this);
        this.params = params;

        this.shown = true;
    }

    this.hideModal = function() {
        this.shown = false;
        this.template = "";
    }

    $scope.$on('hideModal', function() {
        this.hideModal();
    }.bind(this));

    $scope.$on('showModal', function(e, args) {
        var params = args.params || {}
        this.showModal(args.title, args.template, params);
    }.bind(this));
});
