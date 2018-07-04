'use strict';

(function() {
  var noticeForm = document.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var typeOfAccomodation = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  var syncValues = function(element, value) {
    element.value = value;
  };
  var syncValuesWithMin = function(element, value) {
    element.min = value;
    element.value = value;
  };

  window.synchronizeFields(timein, timeout, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(timeout, timein, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(roomNumber, capacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
  window.synchronizeFields(capacity, roomNumber, ['1', '2', '3', '0'], ['1', '2', '3', '100'], syncValues);
  window.synchronizeFields(typeOfAccomodation, price, ['bungalo', 'flat', 'house', 'palace'], ['0', '1000', '5000', '10000'], syncValuesWithMin);

  price.addEventListener('change', function() {
    if (Number(price.value) < 1000) {
      typeOfAccomodation.value = 'bungalo';
    } else if (Number(price.value) >= 1000 && Number(price.value) < 5000) {
      typeOfAccomodation.value = 'flat';
    } else if (Number(price.value) >= 5000 && Number(price.value) < 10000) {
      typeOfAccomodation.value = 'house';
    } else if (Number(price.value) >= 10000) {
      typeOfAccomodation.value = 'palace';
    }
  });

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(
      new FormData(noticeForm),
      function (response) {
        console.log(response);
      },
      window.backend.onError
    );
  });

})();
