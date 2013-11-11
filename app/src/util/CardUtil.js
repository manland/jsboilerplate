var CardUtil = (function() {

  'use strict';

  return {

    buildCard: function() {
			var type = Constants.CARD_TYPE[_.random(0, Constants.CARD_TYPE.length-1)];
			var complexity = Constants.CARD_COMPLEXITY[_.random(0, Constants.CARD_COMPLEXITY.length-1)];
      return new CardController(type, complexity, CardUtil.randomTime(complexity));
    },
    randomTime: function(complexity) {
			return complexity * 2 + _.random(0, 8);
		}

  };

})();