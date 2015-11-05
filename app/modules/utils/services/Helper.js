'use strict';

angular.module('utils')
  .service('Helper', function () {
  	 this.monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    this.toJsDate = function(str){
        var date = str.split("-").join("/");
        var dateOut = new Date(date);
        return dateOut;
    };

    this.compare = function(x,y) {
		if (x === y) {
			return 0;
		}
		return x > y ? 1 : -1;
    };

    this.formatDate = function(date){
    	try{
    	var d = new Date(date.replace(/-/g, "/"));
		var day = d.getDate();
    	var monthIndex = d.getMonth();
    	return this.monthNames[monthIndex]+', '+day +' at '+d.toLocaleTimeString().replace(/:[0-9]{2}(?=[^:]*$)/, "");
    }
    	catch(e){
    		return '';
    	}
    };

  });
