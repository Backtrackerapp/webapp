angular.module('gallery').controller('GalleryThumbController', function($state){
  this.parseImage = function(entry){
    if(entry.image != null) return entry.image;
    else if(entry.post != null) return entry.post.image;
    else if(entry.article != null) return entry.article.image;
  }
  this.parseTitle = function(entry){
    if(entry.image != null ) return "";
    else if(entry.post != null) return entry.post.name;
    else if(entry.article != null) return entry.article.subtitle;
  }
  this.parseDesc = function(entry){
    if(entry.image != null ) return "";
    else if(entry.post != null) {
      var stub = entry.post.text.slice(0,20);
      return stub+"...";
    }
    else if(entry.article != null) return entry.article.tagline;
  }
  this.parseLink = function(entry){
    if(entry.image != null) return;
    else if(entry.post != null){
      $state.go("map.journey", {id: entry.post.journey_id});
    }
    else if(entry.article != null) {
      $state.go("articles.article", {id: entry.article.id});
    }
  }
});
