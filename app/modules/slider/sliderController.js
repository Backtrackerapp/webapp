'use strict';

angular.module('slider')
.controller('SliderController', function ($scope, $timeout, Highlight) {
    this.shown = false;
    this.showing = '';

    this.post = null;
    this.journey = null;

    this.highlight = null;

    this.toggle = function(value) {
        this.shown = value === undefined ? !this.shown : value;
        $timeout(function(){if(!this.shown) this.showing = ''}.bind(this), 400);
    }

    this.showPost = function(post, journey){
        this.post = post;
        this.journey = journey;
        this.showing = 'post';
        this.toggle(true);
    }

    this.showHighlight = function(highlight){
        this.highlight = highlight;
        this.showing = 'highlight';
        this.toggle(true);
    }


    $scope.$on('close', function(test, args){
        //Close the slider... if (int)args.open is specified, then reopen in that amount of time
        this.toggle(false);
        if(args.open) {
            $timeout(function() {
                this.toggle(true);
            }.bind(this), args.open);
        }
    }.bind(this));

    $scope.$on('showHighlight', function(test, args) {
        var nextHighlight = JSON.parse(args.highlight);
        if(this.shown) {
            this.toggle(false);
        }
        Highlight.show({
            id: nextHighlight.id
        }, function(data){
            this.showHighlight(data);
        }.bind(this));
    }.bind(this));

    $scope.$on('showPost', function(test, args) {
        var nextPost = JSON.parse(args.post);
        if(this.shown) {
            if(this.post.id == nextPost.id) {
                this.toggle(false);
            } else {
                this.toggle(false);
                $timeout(function(){
                    this.showPost(nextPost, args.journey);
                }.bind(this), 300);
            }
        } else {
            this.showPost(nextPost, args.journey);
        }
    }.bind(this));

    $scope.$on('tabChanged', function(){
        this.toggle(false);
    }.bind(this))

    $scope.$on('mapTapped', function() {
        this.toggle(false);
    }.bind(this));

});
