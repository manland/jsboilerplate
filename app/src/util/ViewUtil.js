var ViewUtil = (function() {

	'use strict';

  function buildElement(type) {
    return document.createElement(type);
  }

  return {

    buildContainer: function(className) {
      var div = buildElement('div');
      div.className = className;
      return div;
    },
    buildImg: function(url) {
      var img = buildElement('img');
      img.src = url;
      return img;
    },
    buildButton: function(label) {
      var button = buildElement('button');
      button.innerHTML = label;
      return button;
    },
    buildElement: function(className, type) {
      var element = buildElement(type);
      element.className = className;
      return element;
    }

  };

})();