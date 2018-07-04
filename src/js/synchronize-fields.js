'use strict';

(function() {
  window.synchronizeFields = function(element, synchronizedElement, paramsElemnt, paramsSyncElement, callback) {
    element.addEventListener('change', function () {
      for (var i = 0; i < paramsElemnt.length; i++) {
        if (element.value === paramsElemnt[i]) {
          callback(synchronizedElement, paramsSyncElement[i]);
        }
      }
    });
  };
})();
