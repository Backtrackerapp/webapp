angular.module('utils')
.directive('imageDropper', function(){
	return {
		restrict: 'E',
		controller: function($scope){
			this.postImageError = ""
			this.postImage = false;

			this.fileChanged = function(files) {
		    if(files.length == 0) {
		      this.postImageError = "Only .jpg and .png files allowed";
		      this.postImage = false;
		    } else {
		      this.postImageError = "";
		      this.postImage = true;
		      console.log(files);
		      console.log($scope.files);
		      $scope.files = files;
		    }
		  }
		}, 
		controllerAs: 'fileCtrl',
		scope:{
			files: '=',
			current: '='
		},
		templateUrl: 'modules/utils/directives/imageDropper/imageDropper.html'
	}
});