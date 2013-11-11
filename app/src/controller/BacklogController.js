var BacklogController = (function() {

	'use strict';

	function Backlog() {
		this.view = new BacklogView(this);
		this.cards = [];
	}

	ObjectUtil.inherit(Backlog, AbstractController);

	Backlog.prototype.addCard = function(card) {
		this.cards.push(card);
		card.start(this.view.container);
	};

	Backlog.prototype.removeCard = function(card) {
		var index = this.cards.indexOf(card);
		if (index > -1) {
			this.cards.splice(index, 1);
		}
	};

	return Backlog;

})();

