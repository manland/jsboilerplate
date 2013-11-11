var dependencies = [
	'controller/CardController', 'view/CardView',
	'util/CardUtil'
];

define(dependencies, function() {

	describe('in card util', function() {

		beforeEach(function() {
		});

		it('should build a card', function () {
			var card = CardUtil.buildCard();
			expect(card.type).toBeDefined();
			expect(card.complexity).toBeDefined();
		});

		it('should give a time for a card', function () {
			var time = CardUtil.randomTime(1);
			expect(time >= 2 && time <= 10).toBeTruthy();
		});

		it('should give a time for a card', function () {
			var time = CardUtil.randomTime(2);
			expect(time >= 4 && time <= 12).toBeTruthy();
		});

		it('should give a time for a card', function () {
			var time = CardUtil.randomTime(5);
			expect(time >= 10 && time <= 18).toBeTruthy();
		});

	});

});