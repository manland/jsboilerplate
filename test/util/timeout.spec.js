var dependencies = [
	'util/TimeoutUtil'
];

define(dependencies, function() {

	describe('a timeout util', function() {

		beforeEach(function() {
		});

		it('should exec function in special context', function () {
			var context = {ok: false};
			TimeoutUtil.timeout(function() {
				this.ok = true;
			}, 0, context);
			waitsFor(function() {
				return context.ok;
			}, 'context.ok should be true', 1);
			runs(function() {
				expect(context.ok).toBeTruthy();
			});
		});

	});

});