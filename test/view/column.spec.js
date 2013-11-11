var dependencies = [
	'view/ColumnView'
];

define(dependencies, function() {

	describe('a column', function() {

		var column;

		beforeEach(function() {
			column = new ColumnView();
		});

		it('should have a container', function () {
			expect(column.container).toBeDefined();
		});

		it('should draw in element', function () {
			var div = document.createElement('div');
			column.draw(div);
			expect(div.children[0]).toBeDefined();
		});

		it('should have correct className', function () {
			var div = document.createElement('div');
			column.draw(div);
			expect(div.children[0].className).toContain('column');
		});

		it('should have different className if active or inactive', function () {
			var div = document.createElement('div');
			column.draw(div);
			expect(div.children[0].className).toBe('column inactive');
			column.activate();
			expect(div.children[0].className).toBe('column active');
		});

	});

});