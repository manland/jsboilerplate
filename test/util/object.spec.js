var dependencies = [
	'util/ObjectUtil',
	'controller/CardController'
];

define(dependencies, function() {

	var ChildCard = (function() {
		function Child() {
			Child.parent.constructor.apply(this, arguments);
		}

		ObjectUtil.inherit(Child, CardController);

		Child.prototype.getDoubleComplexity = function() {
			return this.complexity * 2;
		};

		return Child;
	})();

	describe('in object util', function() {

		beforeEach(function() {
		});

		it('should inherit properties', function () {
			var childCard = new ChildCard('fakeType', 1);
			expect(childCard.complexity).toBe(1);
			expect(childCard.getDoubleComplexity()).toBe(2);
		});

	});

});