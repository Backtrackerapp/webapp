angular.module('utils')
.service('Util', function() {
    this.parseProfileImage = function (user, size){
        var dimensions = size || 40;
        if(user.profile_image)
            return user.profile_image.iphone;
        if(user.fbid)
            return "http://graph.facebook.com/"+user.fbid+"/picture?type=square&width="+dimensions+"&height="+dimensions;
        return 'images/settings-name.svg'
    }

    this.parseCoverImage = function (user){
        if(user.cover_image)
            return user.cover_image.ipad;
        if(user.cover_photo)
            return user.cover_photo.ipad;
        return 'images/default_cover.jpg';
    }

    this.parseFbPage = function(user){
        if(user.fbpage)
            return user.fbpage;
        if(user.fbid)
            return "http://www.facebook.com/"+user.fbid;
        return null;
    }
});
