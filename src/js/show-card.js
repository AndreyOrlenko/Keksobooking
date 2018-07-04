'use strict';

(function () {

  window.showCard = function (clickableItems, OpeningItems, closeBtn, activeClass) {
    var onPinsClick = function (number) {
      var onButtonCloseClick = function (number, element) {
        OpeningItems[number].style.display = 'none';
        clickableItems[number].classList.remove(activeClass);
        element.removeEventListener('click', onButtonCloseClickWrapper);
        document.removeEventListener('keydown', onDocumentKeydownEsc);
      };

      for (var i = 0; i < clickableItems.length; i++) {
        if (clickableItems[i].classList.contains(activeClass) && i !== number) {
          clickableItems[i].classList.remove(activeClass);
          OpeningItems[i].style.display = 'none';
        } else if (!clickableItems[i].classList.contains(activeClass) && i === number) {

          clickableItems[i].classList.add(activeClass);
          OpeningItems[i].removeAttribute('style');

          var buttonClose = OpeningItems[i].querySelector(closeBtn);

          var onButtonCloseClickWrapper = function () {
            onButtonCloseClick(number, buttonClose);
          };

          buttonClose.addEventListener('click', onButtonCloseClickWrapper);

          var onDocumentKeydownEsc = function (evt) {
            if (evt.keyCode === window.KEYCODE.ESC) {
              onButtonCloseClick(number, buttonClose);
            }
          };

          document.addEventListener('keydown', onDocumentKeydownEsc);
        }
      }
    };
    clickableItems.forEach(function (item, i) {
      item.addEventListener('click', function (evtPins) {
        evtPins.preventDefault();
        onPinsClick(i);
      });
    });

  };

})();
