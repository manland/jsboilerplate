var AbstractView = (function() {

	'use strict';

	function View(controller) {
		this.controller = controller;
	}

	View.prototype.draw = function(element) {
		element.appendChild(this.container);
	};

	return View;

})();

