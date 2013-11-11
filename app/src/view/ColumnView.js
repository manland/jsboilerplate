var ColumnView = (function() {

	'use strict';

	function Column(controller) {
		Column.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('column inactive');
		var that = this;
		DragAndDropUtil.makeDroppable(this.container, function(elementDragged) {
			return controller.addCard(elementDragged.controller);
		});
	}

	ObjectUtil.inherit(Column, AbstractView);

	Column.prototype.refreshCanBeActivate = function() {
		this.container.className = 'column canBeActive ' + this.controller.canBeActivate;
	};

	Column.prototype.activate = function() {
		this.container.className = 'column active';
	};

	return Column;

})();

