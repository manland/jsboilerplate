var CardController = (function() {

	'use strict';

	function Card(type, complexity, time) {
		this.type = type;
		this.complexity = complexity;
		this.initialTime = time;
		this.time = time;
		this.view = new CardView(this);
	}

	ObjectUtil.inherit(Card, AbstractController);

	Card.prototype.refreshView = function() {
		this.view.refresh();
	};

	return Card;

})();

