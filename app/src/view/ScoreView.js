var ScoreView = (function() {

	'use strict';

	function Score(controller) {
		Score.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('score');
		this.containerScore = ViewUtil.buildContainer('dollar');
		this.container.appendChild(this.containerScore);
		this.containerLevel = ViewUtil.buildContainer('level');
		this.container.appendChild(this.containerLevel);
		this.containerLife = ViewUtil.buildContainer('life');
		this.container.appendChild(this.containerLife);
		for (var i = 0; i < Constants.NB_LIFE; i++) {
			if(this.controller.nbLife >= i) {
				this.containerLife.appendChild(ViewUtil.buildContainer('active'));
			} else {
				this.containerLife.appendChild(ViewUtil.buildContainer('inactive'));
			}
		}
	}

	ObjectUtil.inherit(Score, AbstractView);

	Score.prototype.draw = function(element) {
		element.appendChild(this.container);
		this.updateScore();
	};

	Score.prototype.updateScore = function() {
		this.containerScore.innerHTML = this.controller.score + ' $';
		this.containerLevel.innerHTML = 'level : ' + this.controller.level;
		var index = 0;
		_.each(this.containerLife.children, function(element) {
			if(this.controller.nbLife > index) {
				element.className = 'active';
			} else {
				element.className = 'inactive';
			}
			index = index + 1;
		}, this);
	};

	return Score;

})();

