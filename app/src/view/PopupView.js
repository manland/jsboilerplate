var PopupView = (function() {

	'use strict';

	function Popup(controller) {
		this.controller = controller;
	}

	Popup.prototype.hidePopup = function() {
		this.controller.glassElement.style.display = 'none';
		this.controller.firstPopupElement.style.display = 'none';
		this.controller.helpPopupElement.style.display = 'none';
		this.controller.chooseUserPopupElement.style.display = 'none';
	};

	Popup.prototype.displayFirstPopup = function() {
		this.hidePopup();
		this.controller.glassElement.style.display = 'block';
		this.controller.firstPopupElement.style.display = 'block';
	};

	Popup.prototype.displayHelpPopup = function() {
		this.hidePopup();
		this.controller.glassElement.style.display = 'block';
		this.controller.helpPopupElement.style.display = 'block';
	};

	Popup.prototype.displayChooseUserPopup = function() {
		this.hidePopup();
		this.controller.glassElement.style.display = 'block';
		this.controller.chooseUserPopupElement.style.display = 'block';
	};

	return Popup;

})();