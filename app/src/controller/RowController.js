var RowController = (function() {

	'use strict';

	function Row() {
		this.view = new RowView(this);
		this.isActive = false;
		this.card = undefined;
	}

	ObjectUtil.inherit(Row, AbstractController);

	Row.prototype.activate = function() {
		this.isActive = true;
		this.view.activate();
	};

	Row.prototype.canAcceptCard = function(card) {
		return this.isActive && this.card === undefined;
	};

	Row.prototype.addCard = function(card) {
		if(this.canAcceptCard() === true) {
			this.card = card;
			card.start(this.view.container);
		}
	};

	Row.prototype.removeCard = function() {
		this.card = undefined;
		this.view.clear();
	};

	Row.prototype.search3cardsAdjacent = function(prevRow, nextRow) {
		if(this.card !== undefined && prevRow !== undefined && nextRow !== undefined &&
			prevRow.card !== undefined && nextRow.card !== undefined) {
			if(prevRow.card.type === this.card.type && this.card.type === nextRow.card.type) {
				var points = prevRow.card.complexity + this.card.complexity + nextRow.card.complexity;
				prevRow.removeCard();
				this.removeCard();
				nextRow.removeCard();
				return points;
			}
		}
		return false;
	};

	return Row;

})();