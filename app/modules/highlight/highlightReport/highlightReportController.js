'use strict';

angular.module('highlight')
.controller('ReportController', function ($scope, CurrentUser, Highlight, debug) {
  //$scope variables
  //Params {id, close}

  this.reason = "Inappropriate or offensive";
  this.text = "";
  this.textError = null;

  this.postReport = function(highlightid) {
    //I don't like this error report
    if(debug) console.log("blah");
    if(this.reason == "Other" && this.text == "") {
      this.textError = "Please explain why...";
      return;
    }
    Highlight.report({
      id: highlightid,
      reason: this.reason,
      body: this.text,
      access_token: CurrentUser.accessToken
    }, function(){
      $scope.params.close();
    });
  }

  //Some sort of feedback for submiting a report

});