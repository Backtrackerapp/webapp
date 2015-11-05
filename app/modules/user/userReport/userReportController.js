'use strict';

angular.module('user')
.controller('ReportController', function ($scope, CurrentUser, User, debug) {
  //$scope variables
  //Params {id, close}

  this.reason = "Inappropriate or offensive";
  this.text = "";
  this.textError = null;

  this.postReport = function(userid) {
    //I don't like this error report
    if(debug) console.log("blah");
    if(this.reason == "Other" && this.text == "") {
      this.textError = "Please explain why...";
      return;
    }
    
    User.report({
      id: userid,
      reason: this.reason,
      body: this.text,
      access_token: CurrentUser.accessToken
    }, function(){
      $scope.params.close();
    });

    //should be in a highlight report controller
    // if($scope.highlightId) {
    //   $http.post(apiUrl+'/api/highlights/' + $scope.highlightId + '/report', {
    //     reason: this.reason,
    //     body: $scope.report.text,
    //     access_token: CurrentUser.accessToken
    //   }).success(function() {
    //     $scope.hideModal();
    //   });
    // } else {
      

    
  }

});