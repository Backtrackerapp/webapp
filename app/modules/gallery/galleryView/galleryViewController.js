angular.module('gallery').controller('GalleryViewController', function(Gallery){
  this.img = null;
  this.images = Gallery.query();

  this.view = function(img){
    this.img = img;
  }.bind(this)

  this.back = function(){
    this.img = null;
  }.bind(this)
});
