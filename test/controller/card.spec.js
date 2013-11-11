var dependencies = [
	'controller/CardController', 'view/CardView', 
	'util/ViewUtil',
];

define(dependencies, function() {

	describe('in card', function() {

		var card;
		var complexity = 1;
		var type = 'bug';
		var time = 2;

		beforeEach(function() {
			card = new CardController(type, complexity, time);
		});

		it('should have a view', function () {
			expect(card.view).toBeDefined();
		});

		it('should have connect view with it', function () {
			expect(card.view.controller).toBe(card);
		});

		it('should have a complexity', function () {
			expect(card.complexity).toBe(complexity);
		});

		it('should have a type', function () {
			expect(card.type).toBe(type);
		});

		it('should have a time', function () {
			expect(card.time).toBe(time);
		});

	});

});