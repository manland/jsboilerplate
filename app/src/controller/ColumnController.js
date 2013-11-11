var ColumnController = (function() {

	'use strict';

	function Column(game) {
		this.game = game;
		this.view = new ColumnView(this);
		this.isActive = false;
		this.canBeActivate = false;
		this.header = new HeaderColumnController(this);
		this.rows = [];
		this.cardTimeout = undefined;
		for(var i=0; i<Constants.NB_ROWS; i++) {
			this.rows.push(new RowController());
		}
	}

	ObjectUtil.inherit(Column, AbstractController);

	Column.prototype.start = function(element) {
		this.view.draw(element);
		this.header.start(this.view.container);
		_.each(this.rows, function(row) {
			row.start(this.view.container);
		}, this);
	};

	Column.prototype.setCanBeActivate = function(bool) {
		this.canBeActivate = bool;
		this.view.refreshCanBeActivate();
		this.header.setCanBeActivate(bool);
	};

	Column.prototype.activate = function() {
		if(this.canBeActivate === true) {
			this.isActive = true;
			this.canBeActivate = false;
			this.view.refreshCanBeActivate();
			this.header.setCanBeActivate(false);
			this.view.activate();
			this.activeNextRow();
			this.game.columnIsActivated();
		} else {
			throw new Exception('You must setCanBeActivate(true) before call activate');
		}
	};

	Column.prototype.activeNextRow = function() {
		if(this.isActive === true) {
			var potentielRow = _.find(this.rows, function(row) {
				return row.isActive === false;
			});
			if(potentielRow !== undefined) {
				potentielRow.activate();
			}
		} else {
			throw new Exception('You must call activate before activaNextRow');
		}
	};

	Column.prototype.newCurrentCard = function() {
		if(this.rows[0].card !== undefined) {
			this.cardTimeout = TimeoutUtil.timeout(function() {
				var card = this.rows[0].card;
				if(card !== undefined) {
					card.time = card.time - 0.1;
					card.refreshView();
					if(card.time <= 0) {
						this.timeFinish();
					} else {
						this.newCurrentCard();
					}
				}
			}, 100, this);
		}
	};

	Column.prototype.addCard = function(card) {
		for(var i=0; i < this.rows.length; i++) {
			if(this.rows[i].canAcceptCard() === true) {
				this.rows[i].addCard(card);
				this.game.deleteCardInBacklog(card);
				if(i === 0) {
					this.newCurrentCard();
				}
				return true;
			}
		}
		return false;
	};

	Column.prototype.timeFinish = function() {
		this.game.incrementeScore(this.rows[0].card.complexity);
		this.game.search3cardsAdjacent();
		this.rows[0].removeCard();
		this.moveCardsByOnRow();
	};

	Column.prototype.moveCardsByOnRow = function() {
		var previousRow;
		_.each(this.rows, function(row) {
			if(row.card !== undefined && previousRow !== undefined) {
				previousRow.addCard(row.card);
				row.removeCard();
				if(previousRow === this.rows[0]) {
					this.newCurrentCard();
				}
			}
			previousRow = row;
		}, this);
	};

	Column.prototype.pause = function() {
		window.clearInterval(this.cardTimeout);
		this.cardTimeout = undefined;
	};

	Column.prototype.resume = function() {
		if(this.cardTimeout === undefined && this.rows[0].card !== undefined) {
			this.newCurrentCard();
		}
	};

	Column.prototype.search3cardsAdjacent = function(prevColumn, nextColumn) {
		var prevRow, nextRow;
		for (var index = 0; index < this.rows.length; index++) {
			var row = this.rows[index];
			if(index < this.rows.length) {
				nextRow = this.rows[index+1];
			}
			//first search in ligne
			var points = row.search3cardsAdjacent(prevRow, nextRow);
			if(points !== false) {
				this.moveCardsByOnRow();
				this.moveCardsByOnRow();
				this.moveCardsByOnRow();
				return points;
			}
			//second search in column
			if(prevColumn !== undefined && nextColumn !== undefined) {
				var prevCard = prevColumn.rows[index].card;
				var card = this.rows[index].card;
				var nextCard = nextColumn.rows[index].card;
				if(prevCard !== undefined && card !== undefined && nextCard !== undefined) {
					if(prevCard.type === card.type && card.type === nextCard.type) {
						points = prevCard.complexity  + card.complexity + nextCard.complexity;
						prevColumn.rows[index].removeCard();
						prevColumn.moveCardsByOnRow();
						this.rows[index].removeCard();
						this.moveCardsByOnRow();
						nextColumn.rows[index].removeCard();
						nextColumn.moveCardsByOnRow();
						return points;
					}
				}
			}
			prevRow = row;
		}
		return false;
	};

	return Column;

})();

