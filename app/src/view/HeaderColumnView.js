var HeaderColumnView = (function() {

	'use strict';

	function HeaderColumn(controller) {
		HeaderColumn.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('headerColumn');
		ClickUtil.listen(this.container, function() {
			this.onClick();
		}, this);
	}

	ObjectUtil.inherit(HeaderColumn, AbstractView);

	HeaderColumn.prototype.refreshCanBeActivate = function() {
		this.container.className = 'headerColumn canBeActive ' + this.controller.canBeActivate;
	};

	HeaderColumn.prototype.onClick = function() {
		this.controller.activate();
	};

	return HeaderColumn;

})();

