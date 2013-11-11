var ObjectUtil = (function() {

  'use strict';

  var __hasProp = {}.hasOwnProperty;

  return {

    // inheritance utility, took from coffe script project
    // http://coffeescript.org

    // Must be called before first prototype child method
    inherit: function(child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key)) {
          child[key] = parent[key];
        }
      }

      function Ctor() {
        this.constructor = child;
      }

      Ctor.prototype = parent.prototype;
      child.prototype = new Ctor();
      child.parent = parent.prototype;
      return child;
    }

  };

})();