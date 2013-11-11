var dependencies = [
	'controller/ColumnController', 'view/ColumnView',
	'controller/HeaderColumnController', 'view/HeaderColumnView',
];

define(dependencies, function() {

	describe('a header column', function() {

		var headerColumn;

		beforeEach(function() {
			headerColumn = new HeaderColumnController({
				activate: function() {}
			});
		});

		it('should have a view', function () {
			expect(headerColumn.view).toBeDefined();
		});

		it('should have connect view with it', function () {
			expect(headerColumn.view.controller).toBe(headerColumn);
		});

		it('should be activated only when it have canBeActivate true', function () {
			headerColumn.activate();
			expect(headerColumn.isActive).toBe(false);
		});

		it('should be activated only when it have canBeActivate true', function () {
			headerColumn.setCanBeActivate(true);
			headerColumn.activate();
			expect(headerColumn.isActive).toBe(true);
		});

		it('should be activated on click on it', function () {
			headerColumn.setCanBeActivate(true);
			headerColumn.view.onClick();
			expect(headerColumn.isActive).toBe(true);
		});

	});

});