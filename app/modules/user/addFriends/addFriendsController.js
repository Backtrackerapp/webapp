'use strict';

angular.module('user')
.controller('AddFriendsController', function ($scope, $rootScope, $http, User, Helper, CurrentUser, $upload) {

  this.input = "";
  this.loading = false;
  this.results

  this.suggested = User.suggested({
    access_token: CurrentUser.accessToken
  });

  this.searchChanged = function() {
    if(this.input.length > 2) {
      var input = this.input;
      this.loading = true;
      User.search({
        q: this.input,
        access_token: CurrentUser.accessToken
        },
        function(results) {
          results = results.sort(function(x, y) {
            var roomX = x.first_name;
            var roomY = y.first_name;
            if (roomX !== roomY) {
              return Helper.compare(roomX, roomY);
            }
            return Helper.compare(x.last_name, y.last_name);
          });
          if(this.input == input) {
            this.loading = false;
            this.results = results;
          };
        }.bind(this));
    } else {
      this.loading = false;
      this.results = [];
    }
  }

});
