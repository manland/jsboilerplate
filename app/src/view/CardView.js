var CardView = (function() {

	'use strict';

	function Card(controller) {
		Card.parent.constructor.apply(this, arguments);
		this.container = ViewUtil.buildContainer('card');
		this.typeContainer = ViewUtil.buildContainer('type');
		this.complexityContainer = ViewUtil.buildContainer('complexity');
		this.timeContainer = ViewUtil.buildContainer('time');
		this.ellapsedTimeContainer = ViewUtil.buildContainer('ellapsed');
		this.container.appendChild(this.typeContainer);
		this.container.appendChild(this.complexityContainer);
		this.timeContainer.appendChild(this.ellapsedTimeContainer);
		this.container.appendChild(this.timeContainer);
		DragAndDropUtil.makeDraggable(this);
		this.typeContainer.innerHTML = this.controller.type;
		for (var i = 0; i < Constants.CARD_COMPLEXITY.length; i++) {
			if(this.controller.complexity > Constants.CARD_COMPLEXITY[i]) {
				this.complexityContainer.appendChild(ViewUtil.buildElement('star active', 'span'));
			} else {
				this.complexityContainer.appendChild(ViewUtil.buildElement('star inactive', 'span'));
			}
		}
	}

	ObjectUtil.inherit(Card, AbstractView);

	Card.prototype.draw = function(element) {
		this.timeContainer.style.display = 'none';
		element.appendChild(this.container);
	};

	Card.prototype.refresh = function() {
		this.timeContainer.style.display = 'block';
		var percent = (this.controller.time * 100) / this.controller.initialTime;
		this.ellapsedTimeContainer.style.width = percent + '%';
	};

	return Card;

})();

