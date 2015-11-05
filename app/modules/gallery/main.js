(function(){
var app = angular.module('gallery', []);

app.directive('galleryView', function(){
  return {
    restrict: 'E',
    templateUrl: 'modules/gallery/galleryView/galleryView.html',
    controller: 'GalleryViewController',
    controllerAs: 'viewCtrl',
    scope: {}
  }
});

app.directive('galleryThumb', function(){
  return {
    restrict: 'E',
    templateUrl: 'modules/gallery/galleryThumb/galleryThumb.html',
    controller: 'GalleryThumbController',
    controllerAs: 'thumbCtrl',
    scope: {
      thumb: "=",
      view: "="
    }
  }
});

app.directive('galleryExpanded', function(){
  return {
    restrict: 'E',
    templateUrl: 'modules/gallery/galleryExpanded/galleryExpanded.html',
    scope: {
      img: "=",
      back: "="
    }
  }
});
})();
