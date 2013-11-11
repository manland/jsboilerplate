var PopupController = (function() {

	'use strict';

	function Popup(game, glassElement, firstPopupElement, helpPopupElement, chooseUserPopupElement) {
		this.game = game;
		this.glassElement = glassElement;
		this.firstPopupElement = firstPopupElement;
		ClickUtil.listenDomElement('firstPopupHelpButton', function() {
			this.displayHelpPopup();
		}, this);
		ClickUtil.listenDomElement('firstPopupStartButton', function() {
			this.displayChooseUserPopup();
		}, this);
		this.helpPopupElement = helpPopupElement;
		ClickUtil.listenDomElement('helpPopupBackButton', function() {
			this.displayFirstPopup();
		}, this);
		this.chooseUserPopupElement = chooseUserPopupElement;
		ClickUtil.listenDomElement('chooseUserPopupDev1Button', function() {
			this.startGame();
		}, this);
		ClickUtil.listenDomElement('chooseUserPopupBackButton', function() {
			this.displayFirstPopup();
		}, this);
		this.view = new PopupView(this);
		this.displayFirstPopup();
	}

	Popup.prototype.startGame = function() {
		this.view.hidePopup();
		this.game.resume();
	};

	Popup.prototype.displayFirstPopup = function() {
		this.view.displayFirstPopup();
	};

	Popup.prototype.displayHelpPopup = function() {
		this.view.displayHelpPopup();
	};

	Popup.prototype.displayChooseUserPopup = function() {
		this.view.displayChooseUserPopup();
	};

	return Popup;

})();