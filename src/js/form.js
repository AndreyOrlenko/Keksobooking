'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity =  noticeForm.querySelector('#capacity');
  var typeOfAccomodation = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  timein.addEventListener('change', function () {
    if (timein.value !== timeout.value) {
      timeout.value = timein.value;
    }
  });

  timeout.addEventListener('change', function () {
    if (timeout.value !== timein.value) {
      timein.value = timeout.value;
    }
  });

  roomNumber.addEventListener('change', function () {
    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        break;
      case '2':
        capacity.value = '2';
        break;
      case '3':
        capacity.value = '3';
        break;
      case '100':
        capacity.value = '0';
        break;
    }
  });

  capacity.addEventListener('change', function () {
    switch (capacity.value) {
      case '1':
        roomNumber.value = '1';
        break;
      case '2':
        roomNumber.value = '2';
        break;
      case '3':
        roomNumber.value = '3';
        break;
      case '0':
        roomNumber.value = '100';
        break;
    }
  });

  price.addEventListener('change', function () {
    if(Number(price.value) < 1000){
      typeOfAccomodation.value = 'bungalo';
    } else if (Number(price.value) >= 1000 && Number(price.value) < 5000) {
      typeOfAccomodation.value = 'flat';
    } else if (Number(price.value) >= 5000 && Number(price.value) < 10000) {
      typeOfAccomodation.value = 'house';
    } else if (Number(price.value) >= 10000) {
      typeOfAccomodation.value = 'palace';
    }
  });

  typeOfAccomodation.addEventListener('change', function () {
    switch (typeOfAccomodation.value) {
      case 'bungalo':
        price.value = '0';
        break;
      case 'flat':
        price.value = '1000';
        break;
      case 'house':
        price.value = '5000';
        break;
      case 'palace':
        price.value = '10000';
        break;
    }
  });

})();
