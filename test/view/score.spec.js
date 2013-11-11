var dependencies = [
	'view/ScoreView'
];

define(dependencies, function() {

	describe('a score', function() {

		var score;
		var fakeController = {score: 0};

		beforeEach(function() {
			score = new ScoreView(fakeController);
		});

		it('should have a container', function () {
			expect(score.container).toBeDefined();
		});

		it('should draw in element', function () {
			var div = document.createElement('div');
			score.draw(div);
			expect(div.children[0]).toBeDefined();
		});

		it('should set correct className', function () {
			var div = document.createElement('div');
			score.draw(div);
			expect(div.children[0].className).toContain('score');
		});

		it('should show score', function () {
			var div = document.createElement('div');
			score.draw(div);
			score.updateScore();
			expect(score.container.innerHTML).toContain('0 $');
		});

		it('should update score', function () {
			var div = document.createElement('div');
			score.draw(div);
			score.updateScore();
			expect(score.container.innerHTML).toContain('0 $');
			fakeController.score = 100;
			score.updateScore();
			expect(score.container.innerHTML).toContain('100 $');
		});

	});

});