var UserController = (function() {

	'use strict';

	function User(game) {
		this.view = new UserView(this);
		this.game = game;
	}

	ObjectUtil.inherit(User, AbstractController);

	User.prototype.refreshView = function() {
		this.view.refresh();
	};

	User.prototype.pause = function() {
		this.game.pause();
	};

	return User;

})();

