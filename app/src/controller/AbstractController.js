var AbstractController = (function() {

	'use strict';

	function Abstract() {
	}

	Abstract.prototype.start = function(element) {
		this.view.draw(element);
	};

	return Abstract;

})();

