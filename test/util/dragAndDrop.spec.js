var dependencies = [
	'util/DragAndDropUtil'
];

function simulDrop(drag, drop, acceptDrop) {
	DragAndDropUtil.makeDroppable(drop, function(drag) {
		if(acceptDrop === true) {
			drop.appendChild(drag.container);
		}
		return acceptDrop;
	});
	DragAndDropUtil.makeDraggable(drag);
	drag.container.ondragstart({dataTransfer: {setData: function() {}}});
	drop.ondrop({
		stopPropagation: function(){}
	});
}

define(dependencies, function() {

	describe('in util drag and drop', function() {

		var element;

		beforeEach(function() {
			element = {container: document.createElement('div')};
		});

		it('should make draggable an element', function () {
			DragAndDropUtil.makeDraggable(element);
			expect(element.container.draggable).toBe(true);
		});

		it('should make droppable an element', function () {
			DragAndDropUtil.makeDroppable(element);
			expect(element.ondragenter).toBeDefined();
			expect(element.ondragover).toBeDefined();
			expect(element.ondrop).toBeDefined();
		});

		it('should move draggable element into droppable element on drop', function () {
			var drop = document.createElement('div');
			simulDrop(element, drop, true);
			expect(drop.children[0]).toBe(element.container);
		});

		it('should make undraggable the element was dropped and accepted', function () {
			var drop = document.createElement('div');
			simulDrop(element, drop, true);
			expect(element.container.draggable).toBe(false);
		});

		it('should refuse an element', function () {
			var drop = document.createElement('div');
			simulDrop(element, drop, false);
			expect(drop.children.length).toBe(0);
			expect(element.container.draggable).toBe(true);
		});

	});

});