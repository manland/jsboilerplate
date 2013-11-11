var dependencies = [
	'view/BacklogView'
];

define(dependencies, function() {

	describe('a backlog', function() {

		var backlog;

		beforeEach(function() {
			backlog = new BacklogView();
		});

		it('should have a container', function () {
			expect(backlog.container).toBeDefined();
		});

		it('should draw in element', function () {
			var div = document.createElement('div');
			backlog.draw(div);
			expect(div.children[0]).toBeDefined();
		});

		it('should set correct className', function () {
			var div = document.createElement('div');
			backlog.draw(div);
			expect(div.children[0].className).toBe('backlog');
		});

	});

});