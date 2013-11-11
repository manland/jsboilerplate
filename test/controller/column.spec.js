var dependencies = [
	'controller/ColumnController', 'view/ColumnView',
	'controller/GameController', 'view/GameView',
	'controller/ScoreController', 'view/ScoreView',
	'constants'
];

define(dependencies, function() {

	describe('a column', function() {

		var column;

		function buildNewColumn() {
			return new ColumnController({
				deleteCardInBacklog: function(){}, 
				incrementeScore: function(){},
				columnIsActivated: function(){},
				search3cardsAdjacent: function(){}
			});
		}

		function activeColumn() {
			column.setCanBeActivate(true);
			column.activate();
		}

		function activeColumnAnd1Row() {
			activeColumn();
			column.activeNextRow();
		}

		beforeEach(function() {
			column = buildNewColumn();
		});

		it('should have a view', function () {
			expect(column.view).toBeDefined();
		});

		it('should have connect view with it', function () {
			expect(column.view.controller).toBe(column);
		});

		it('should have a header column', function () {
			expect(column.header).toBeDefined();
		});

		it('should have Constants.NB_COLUMNS rows', function () {
			expect(column.rows.length).toBe(Constants.NB_COLUMNS);
		});

		it('should refuse card when it full', function () {
			var card = CardUtil.buildCard();
			expect(column.addCard(card)).toBe(false);
		});

		it('should be inactive at start', function () {
			expect(column.isActive).toBe(false);
		});

		it('should not be active after activate call and canBeActivate is false', function () {
			expect(column.activate).toThrow();
			expect(column.isActive).toBe(false);
		});

		it('should be active after activate call and canBeActivate is true', function () {
			activeColumn();
			expect(column.isActive).toBe(true);
		});

		it('should active 1 new row', function () {
			activeColumnAnd1Row();
			expect(column.rows[0].isActive).toBe(true);
		});

		it('should add card in first row', function () {
			var card = CardUtil.buildCard();
			activeColumnAnd1Row();
			column.addCard(card);
			expect(column.rows[0].card).toBe(card);
		});

		it('should not add card when row is not activate', function () {
			var card = CardUtil.buildCard();
			activeColumn();
			column.addCard(card);
			var card2 = CardUtil.buildCard();
			column.addCard(card2);
			expect(column.rows[1].card).toBeUndefined();
		});

		it('should add card in second row when first is full', function () {
			var card = CardUtil.buildCard();
			activeColumnAnd1Row();
			column.addCard(card);
			var card2 = CardUtil.buildCard();
			column.activeNextRow();
			column.addCard(card2);
			expect(column.rows[1].card).toBe(card2);
		});

		it('should move others cards to the top', function () {
			var card = CardUtil.buildCard();
			activeColumnAnd1Row();
			column.addCard(card);
			var card2 = CardUtil.buildCard();
			column.activeNextRow();
			column.addCard(card2);
			var card3 = CardUtil.buildCard();
			column.activeNextRow();
			column.addCard(card3);
			column.timeFinish();
			expect(column.rows[0].card).toBe(card2);
			expect(column.rows[1].card).toBe(card3);
			expect(column.rows[2].card).toBeUndefined();
		});

		it('should remove current card when card time is finish', function () {
			var card = CardUtil.buildCard();
			card.time = 0;
			activeColumnAnd1Row();
			column.addCard(card);
			waitsFor(function() {
				return column.rows[0].card === undefined;
			}, 'should be delete card', 1000);
			runs(function() {
				expect(column.rows[0].card).toBeUndefined();
			});
		});

		function buildColumnWith3IdenticalCards() {
			var cards = [CardUtil.buildCard(), CardUtil.buildCard(), CardUtil.buildCard()];
			activeColumn();
			_.each(cards, function(card) {
				card.type = 'fake';
				column.activeNextRow();
				column.addCard(card);
			});
		}

		it('should remove 3 cards when same cards type is adjacents on same column', function () {
			buildColumnWith3IdenticalCards();
			column.search3cardsAdjacent();
			expect(column.rows[0].card).toBeUndefined();
		});

		it('should remove 3 cards when same cards type is adjacents on same column and move other cards to the top', function () {
			buildColumnWith3IdenticalCards();
			var card = CardUtil.buildCard();
			card.type = 'other';
			column.activeNextRow();
			column.addCard(card);
			column.search3cardsAdjacent();
			expect(column.rows[0].card).toBe(card);
		});

		function initColumnWith1Card(column, cardType) {
			var card = CardUtil.buildCard();
			card.type = cardType;
			column.setCanBeActivate(true);
			column.activate();
			column.activeNextRow();
			column.addCard(card);
		}

		it('should remove 3 cards when same cards type is adjacents on same ligne', function () {
			initColumnWith1Card(column, 'fake');

			var prevColumn = buildNewColumn();
			initColumnWith1Card(prevColumn, 'fake');

			var nextColumn = buildNewColumn();
			initColumnWith1Card(nextColumn, 'fake');
			
			column.search3cardsAdjacent(prevColumn, nextColumn);
			expect(column.rows[0].card).toBeUndefined();
		});

		it('should remove 3 cards when same cards type is adjacents on same ligne and move to top others', function () {
			initColumnWith1Card(column, 'fake');
			var card = CardUtil.buildCard();
			card.type = 'other';
			column.activeNextRow();
			column.addCard(card);

			var prevColumn = buildNewColumn();
			initColumnWith1Card(prevColumn, 'fake');
			var card2 = CardUtil.buildCard();
			card2.type = 'other';
			prevColumn.activeNextRow();
			prevColumn.addCard(card2);

			var nextColumn = buildNewColumn();
			initColumnWith1Card(nextColumn, 'fake');
			
			column.search3cardsAdjacent(prevColumn, nextColumn);
			expect(column.rows[0].card).toBe(card);
			expect(prevColumn.rows[0].card).toBe(card2);
		});

	});

});