var dependencies = [
	'view/GameView'
];

define(dependencies, function() {

	describe('a game', function() {

		var game;

		beforeEach(function() {
			game = new GameView();
		});

		it('should have a container', function () {
			expect(game.container).toBeDefined();
		});

		it('should draw in element', function () {
			var div = document.createElement('div');
			game.draw(div);
			expect(div.children[0]).toBeDefined();
		});

		it('should set correct className', function () {
			var div = document.createElement('div');
			game.draw(div);
			expect(div.children[0].className).toBe('game');
		});

	});

});