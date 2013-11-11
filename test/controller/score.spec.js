var dependencies = [
	'controller/ScoreController', 'view/ScoreView',
];

define(dependencies, function() {

	describe('a score', function() {

		var score;

		beforeEach(function() {
			score = new ScoreController();
		});

		it('should have a view', function () {
			expect(score.view).toBeDefined();
		});

		it('should have connect view with it', function () {
			expect(score.view.controller).toBe(score);
		});

		it('should have score', function () {
			expect(score.score).toBe(0);
		});

		it('should have score', function () {
			score.incrementeBy(10);
			expect(score.score).toBe(10);
		});

	});

});