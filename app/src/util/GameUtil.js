var GameUtil = (function() {

	'use strict';

  return {

    calculTimeNewCard: function(score) {
			var time = (-1.109 * score) + Constants.FPS;
			if(time > Constants.FPS_MIN) {
				return time;
			} else {
				return Constants.FPS_MIN;
			}
    }

  };

})();