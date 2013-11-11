var UserView = (function() {

	'use strict';

	function User(controller) {
		User.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('user');
		this.spanHelper = ViewUtil.buildElement('helper', 'span');
		this.container.appendChild(this.spanHelper);
		this.avatar = ViewUtil.buildImg('assets/img/dev1.png');
		this.container.appendChild(this.avatar);
		this.containerScore = ViewUtil.buildContainer('userScore');
		this.container.appendChild(this.containerScore);
		this.pauseButton = ViewUtil.buildButton('Pause');
		ClickUtil.listen(this.pauseButton, function() {
			this.controller.pause();
		}, this);
		this.container.appendChild(this.pauseButton);
	}

	ObjectUtil.inherit(User, AbstractView);

	User.prototype.draw = function(element) {
		User.parent.draw.apply(this, arguments);

		this.refresh();
	};

	User.prototype.refresh = function() {
	};

	return User;

})();

