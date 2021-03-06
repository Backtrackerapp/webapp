'use strict';

angular.module('highlight')
.controller('NewHighlightController', function ($scope, CurrentUser, Highlight, Mixpanel) {
    //On $Scope params = {close: function to close modal}

    this.step = 1;
    this.searchField = "";
    this.postText = "";
    this.action = "Suggest";
    this.autocompleteOptions = {
        types: 'establishment'
    }


    $scope.user = CurrentUser.loggedIn;
    $scope.result = null;

    this.submit = function() {
        // Finished the first page. ----this is awful---- we need to use HTML to require fields TODO
        if(this.postText == "") {
            this.postTextError = "Please enter some text for your suggested highlight";
            return;
        } else {
            this.postTextError = "";
        }
        if(this.searchField == "") {
            this.searchFieldError = "Please enter a location for your suggested highlight";
            return;
        } else {
            this.searchFieldError = "";
        }
        // Post highlight to server... This works but! I have no idea how :P
        this.step = 2;

        console.log($scope.result);
        Highlight.save({
            name: $scope.result.name,
            address: $scope.result.formatted_address,
            latitude: $scope.result.geometry.location.lat(),
            longitude: $scope.result.geometry.location.lng(),
            text: this.postText,
            access_token: CurrentUser.accessToken
        }, function(){
            Mixpanel.track('Highlight_Suggest_Submit', {
                success: true
            });
            $scope.params.close();
        }, function(data){
            Mixpanel.track('Highlight_Suggest_Submit', {
                success: false
            });
            this.step = 1;
            if(data.lonlat) {
                this.action = "Post";
                this.searchFieldError = "We couldn't find this location, please try again";
            }
        }.bind(this));
    }



});
