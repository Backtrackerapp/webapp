'use strict';

angular.module('utils')
.service('Cache', function () {
  //I can do this so much better... Make this a module with a config stating which cache's you'd like TODO
  this.friends = [];
  this.highlights = [];

  this.addFriends = function(newFriends) {
    var that = this;
    _.each(newFriends, function(friend) {
      if(!_.findWhere(that.friends, {id: friend.id})) {
        that.friends.push(friend)
      }
    });
  }

  this.addHighlights = function(newHighlights) {
    var that = this;
    _.each(newHighlights, function(highlight) {
      if(!_.findWhere(that.highlights, {id: highlight.id})) {
        that.highlights.push(highlight)
      }
    });
  }
});
