var ScoreController = (function() {

	'use strict';

	function Score() {
		this.view = new ScoreView(this);
		this.score = 0;
		this.level = 0;
		this.nbLife = Constants.NB_LIFE;
	}

	ObjectUtil.inherit(Score, AbstractController);

	Score.prototype.incrementeBy = function(score) {
		this.score = this.score + score;
		this.view.updateScore();
	};

	Score.prototype.loose = function() {
		this.nbLife = this.nbLife - 1;
		this.view.updateScore();
		if(this.nbLife === 0) {
			window.alert('Game Over');
		}
	};

	return Score;

})();