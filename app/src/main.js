window.onload = function() {

	var globalContainer = document.getElementById('globalContainer');

	var game = new GameController();
	game.start(globalContainer);

	var popups = new PopupController(
		game, 
		document.getElementById('glass'), 
		document.getElementById('firstPopup'),
		document.getElementById('helpPopup'),
		document.getElementById('chooseUserPopup')
	);

	game.columns[0].setCanBeActivate(true);
	game.columns[0].activate();
	game.pause();

};