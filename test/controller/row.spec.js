var dependencies = [
	'controller/RowController', 'view/RowView',
];

define(dependencies, function() {

	describe('a row', function() {

		var row;

		beforeEach(function() {
			row = new RowController();
		});

		it('should have a view', function () {
			expect(row.view).toBeDefined();
		});

		it('should have connect view with it', function () {
			expect(row.view.controller).toBe(row);
		});

		it('should be active when set it', function () {
			row.activate();
			expect(row.isActive).toBe(true);
		});

		it('should add a card', function () {
			var card = CardUtil.buildCard();
			row.activate();
			row.addCard(card);
			expect(row.card).toBe(card);
		});

		it('should delete a card', function () {
			row.activate();
			row.addCard(CardUtil.buildCard());
			row.removeCard();
			expect(row.card).toBeUndefined();
		});

		it('should return false when not find 3 cards adjacents', function () {
			expect(row.search3cardsAdjacent()).toBe(false);
		});

		it('should find 3 cards adjacents, remove it and return points', function () {
			var card1 = CardUtil.buildCard();
			card1.type = 'fake';
			row.activate();
			row.addCard(card1);
			var prevRow = new RowController();
			var card2 = CardUtil.buildCard();
			card2.type = 'fake';
			prevRow.activate();
			prevRow.addCard(card2);
			var nextRow = new RowController();
			var card3 = CardUtil.buildCard();
			card3.type = 'fake';
			nextRow.activate();
			nextRow.addCard(card3);
			var points = card1.complexity + card2.complexity + card3.complexity;
			expect(row.search3cardsAdjacent(prevRow, nextRow)).toBe(points);
			expect(row.card1).toBeUndefined();
			expect(row.card2).toBeUndefined();
			expect(row.card3).toBeUndefined();
		});

	});

});