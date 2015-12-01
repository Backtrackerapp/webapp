'use strict';

angular.module('journey')
.controller('NewPostController', function ($scope, $rootScope, $http, CurrentUser, $upload, apiUrl, Journey, underscore) {
    //on $Scope params = {journey_id, close}
    this.step = 1;

    this.currentJourneys = angular.copy(CurrentUser.user.journeys);
    this.currentJourneys.push({name: "New Journey", id: 0});
    this.journey = underscore.filter(this.currentJourneys, function(j){
        return j.id === $scope.params.journey_id;
    })[0];

    this.today = new Date();
    this.autocompleteOptions = {
        types: 'geocode'
    };

    this.searchField = "";
    this.searchFieldError = "";
    this.ghostSearchField = "";
    this.ghostSearchFieldError = "";

    this.files = null;

    this.journeyNameError = "";
    this.postDate = "";
    this.postDateError = "";
    this.postText = "";
    this.postTextError = "";

    this.action = "Next";
    this.cancelAction = "Cancel";

    this.nextStep = function() {
        if(this.step === 1) {
            // Finished the first page
            if(this.searchField === "") {
                this.searchFieldError = "Please enter a location";
                return;
            } else {
                this.searchFieldError = "";
            }
            if(this.postDate === "") {
                this.postDateError = "Please pick a date";
                return;
            } else {
                this.postDateError = "";
            }
            if(this.journey.id === 0 && this.journey.name === "") {
                this.journeyNameError = "Please enter a name for your new journey";
                return;
            } else {
                this.postDateError = "";
            }
            this.action = "Post";
            this.step = 2;
            return;
        }

        if(this.step === 2) {
            // Finished entering post text
            if(this.postText === "") {
                this.postTextError = "Please enter some text for your post";
                return;
            } else {
                this.postTextError = "";
            }
            this.step = 3;

            var file = null;
            if(this.files && this.files.length > 0) {
                file = this.files[0];
            }
            Journey.post({
                location_name: this.searchField,
                journey_id: this.journey.id,
                journey_name: this.journey.name,
                text: this.postText,
                date: this.postDate,
                access_token: CurrentUser.accessToken,
            },
            function(user){
                CurrentUser.user = user;
                underscore.each(CurrentUser.user.journeys, function(j) {
                    if(j.name === this.journey.name) {
                        this.journey.id = j.id;
                    }
                }.bind(this));
                CurrentUser.getUser();
                $rootScope.$broadcast('reloadJourney');
                $scope.params.close();
            }.bind(this),
            function(data){
                if(data.lonlat) {
                    this.step = 1;
                    this.cancelAction = "Cancel";
                    this.action = "Next";
                    this.searchFieldError = "We couldn't find this location, please try again";
                }
            }.bind(this),
            file,
            function(evt) {
                console.log(evt.loaded / evt.total);
            }.bind(this));
        }

        if(this.step === 4) {
            // Ghost post ready
            if(this.ghostSearchField === "") {
                this.ghostSearchFieldError = "Please enter a location";
                return;
            }
            this.step = 5;
            Journey.ghost({
                location_name: this.ghostSearchField,
                journey_id: this.journey.id,
                date: this.postDate,
                access_token: CurrentUser.accessToken
            },
            function(){
                $rootScope.$broadcast('reloadJourney');
                $scope.params.close();
            }.bind(this),
            function(data) {
                if(data.lonlat) {
                    this.step = 4;
                    this.ghostSearchFieldError = "We couldn't find this location, please try again";
                }
            }.bind(this));
        }
    };
});
