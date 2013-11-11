var BacklogView = (function() {

	'use strict';

	function Backlog(controller) {
		Backlog.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('backlog');
	}

	ObjectUtil.inherit(Backlog, AbstractView);

	return Backlog;

})();

