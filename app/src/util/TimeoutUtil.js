var TimeoutUtil = (function() {

  'use strict';

  return {

    timeout: function(callback, time, context) {
      return window.setTimeout(function() {
				callback.call(context);
      }, time);
    },
    interval: function(callback, time, context) {
			return window.setInterval(function() {
				callback.call(context);
			}, time);
    }

  };

})();