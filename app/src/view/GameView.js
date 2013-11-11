var GameView = (function() {

	'use strict';

	function Game(controller) {
		Game.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('game');
		this.containerColumns = ViewUtil.buildContainer('columns');
	}

	ObjectUtil.inherit(Game, AbstractView);

	Game.prototype.drawColumnsContainer = function() {
		this.container.appendChild(this.containerColumns);
	};

	Game.prototype.getColumnsContainer = function() {
		return this.containerColumns;
	};

	return Game;

})();

