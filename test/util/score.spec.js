var dependencies = [
	'util/ScoreUtil'
];

define(dependencies, function() {

	describe('a score util', function() {

		beforeEach(function() {
		});

		it('should return true when i have a score of 6 and a level of 0', function () {
			expect(ScoreUtil.isNextLevel(6, 0)).toBeTruthy();
		});

		it('should return true when i have a score of 15 and a level of 1', function () {
			expect(ScoreUtil.isNextLevel(15, 3)).toBeTruthy();
		});

		it('should return false when i have a score of 15 and a level of 5', function () {
			expect(ScoreUtil.isNextLevel(15, 5)).toBe(false);
		});

	});

});