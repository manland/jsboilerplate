var dependencies = [
	'view/RowView'
];

define(dependencies, function() {

	describe('a row', function() {

		var row;

		beforeEach(function() {
			row = new RowView();
		});

		it('should have a container', function () {
			expect(row.container).toBeDefined();
		});

		it('should draw in element', function () {
			var div = document.createElement('div');
			row.draw(div);
			expect(div.children[0]).toBeDefined();
		});

		it('should set correct className', function () {
			var div = document.createElement('div');
			row.draw(div);
			expect(div.children[0].className).toContain('row');
		});

		it('should have different className if active or inactive', function () {
			var div = document.createElement('div');
			row.draw(div);
			expect(div.children[0].className).toBe('row inactive');
			row.activate();
			expect(div.children[0].className).toBe('row active');
		});

		it('should be empty when clear called', function () {
			var div = document.createElement('div');
			row.draw(div);
			row.container.appendChild(document.createElement('div'));
			row.clear();
			expect(row.container.innerHTML).toBe('');
		});

	});

});