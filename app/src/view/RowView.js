var RowView = (function() {

	'use strict';

	function Row(controller) {
		Row.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('row inactive');
	}

	ObjectUtil.inherit(Row, AbstractView);

	Row.prototype.activate = function() {
		this.container.className = 'row active';
	};

	Row.prototype.clear = function() {
		this.container.innerHTML = '';
	};

	return Row;

})();

