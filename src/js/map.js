'use strict';

//Создание меток - элементов DOM
(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var pin = document.querySelector('template').content.querySelector('.map__pin');
  var card = document.querySelector('template').content.querySelector('.map__card');
  var fieldset = document.querySelectorAll('.form__element');
  var mapPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
  var pins;
  var cards;

  window.delAllChildren = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var createFeatures = function (element, arr, destination) {
    for (var i = 0; i < arr.length; i++) {
      var copyOfElements = element.cloneNode(true);
      copyOfElements.classList.add('feature');
      copyOfElements.classList.add('feature--' + arr[i]);
      destination.appendChild(copyOfElements.cloneNode(true));
    }
  };

  var createNewPin = function (number, template) {
    var element = template.cloneNode(true);
    element.style.left = window['house' + number].location.x - 20 + 'px';
    element.style.top = window['house' + number].location.y - 62 + 'px';
    element.setAttribute('src', window['house' + number].author.avatar);
    return element;
  };

  var createNewCard = function (number, template) {
    var element = template.cloneNode(true);
    var elementLi = document.createElement('li');
    var featuresParent = element.querySelector('.popup__features');
    var title = window['house' + number].offer.title;
    var address = window['house' + number].offer.address;
    var price = window['house' + number].offer.price;
    var type = window['house' + number].offer.type;
    var rooms = window['house' + number].offer.rooms;
    var guests = window['house' + number].offer.guests;
    var checkin = window['house' + number].offer.checkin;
    var checkout = window['house' + number].offer.checkout;
    var description = window['house' + number].offer.description;
    var avatar = window['house' + number].author.avatar;
    var features = window['house' + number].offer.features;

    element.style.display = 'none';
    element.querySelector('h3').textContent = title;
    element.querySelector('p small').textContent = address;
    element.querySelector('.popup__price').textContent = price + '₽' + '/ночь';
    switch (type) {
      case 'flat':
        element.querySelector('h4').textContent = 'Квартира';
        break;
      case 'bungalo':
        element.querySelector('h4').textContent = 'Бунгало';
        break;
      case 'house':
        element.querySelector('h4').textContent = 'Дом';
        break;
      default:
        element.querySelector('h4').textContent = 'Тип жилья не установлен';
    }
    element.querySelector('p:nth-of-type(3)').textContent = rooms + ' для ' + guests + ' гостей';
    element.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    window.delAllChildren(featuresParent);
    createFeatures(elementLi, features, featuresParent);

    element.querySelector('p:nth-of-type(5)').textContent = description;
    element.querySelector('.popup__avatar').setAttribute('src', avatar);
    return element;
  };

  var renderElements = function (quantity, createFunction, template, finalDestination) {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i <= quantity; i++) {
      fragment.appendChild(createFunction(i, template));
    }
    finalDestination.appendChild(fragment);
  };


  renderElements(8, createNewCard, card, map);
  cards = map.querySelectorAll('.map__card');


  //Деактивация формы, активация пинов
  window.KEYCODE = {
    ENTER: 13,
    ESC: 27
  };

  var addAtributToArrayItem = function (arr, atributeName, atributeValue) {
    arr.forEach(function (item, i) {
      arr[i].setAttribute(atributeName, atributeValue);
    });
  };

  var removeAtributToArrayItem = function (arr, atributeName, atributeValue) {
    arr.forEach(function (item, i) {
      arr[i].removeAttribute(atributeName, atributeValue);
    });
  };
  addAtributToArrayItem(fieldset, 'disabled', 'disabled');


  var onMapPinMouseup = function (evt) {

    var onPinsClick = function (number) {
      var onButtonCloseClick = function (number, element) {
        cards[number].style.display = 'none';
        pins[number].classList.remove('map__pin--active');
        element.removeEventListener('click', onButtonCloseClickWrapper);
        document.removeEventListener('keydown', onDocumentKeydownEsc);
      };

      for (var i = 0; i < pins.length; i++) {
        if (pins[i].classList.contains('map__pin--active') && i !== number) {
          pins[i].classList.remove('map__pin--active');
          cards[i].style.display = 'none';
        } else if (!pins[i].classList.contains('map__pin--active') && i === number) {

          pins[i].classList.add('map__pin--active');
          cards[i].removeAttribute('style');

          var buttonClose = cards[i].querySelector('.popup__close');

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

    evt.preventDefault();
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    removeAtributToArrayItem(fieldset, 'disabled', 'disabled');
    renderElements(8, createNewPin, pin, mapPins);
    pins = map.querySelectorAll('.map__pin:not(:first-of-type)');
    pins.forEach(function (item, i) {
      item.addEventListener('click', function (evtPins) {
        evtPins.preventDefault();
        onPinsClick(i);
      });
    });

    mapPin.removeEventListener('mouseup', onMapPinMouseup);

    var onMapPinMousedown = function (evt) {
      var coordinateX = evt.pageX;
      var coordinateY = evt.pageY;
      console.log(mapPin.parentNode);
      console.log(mapPin.offsetTop);
      console.log(mapPin.offsetLeft);

      var onMapPinMousemove = function (evtMove) {
        evtMove.preventDefault();
        var transitionY = evtMove.pageY;
        if (transitionY < 100) {
          transitionY = 100;
        } else if (transitionY > 500) {
          transitionY = 500;
        }
        var y = coordinateY - transitionY;
        var x = coordinateX - evtMove.pageX;
        coordinateX = evtMove.pageX;
        coordinateY = transitionY;
        console.log(evtMove);


        mapPin.style.top = (mapPin.offsetTop - y) + 'px';
        mapPin.style.left = (mapPin.offsetLeft - x) + 'px';

        address.value = 'x: ' + (coordinateX + 31) + ', ' + 'y: ' + (coordinateY + 84);

      };

      var onMapPinMouseUp = function (evt) {
        evt.preventDefault();
        mapPins.removeEventListener('mousemove', onMapPinMousemove);
        mapPins.removeEventListener('mousemove', onMapPinMouseUp);
      };

      mapPins.addEventListener('mousemove', onMapPinMousemove);
      mapPins.addEventListener('mouseup', onMapPinMouseUp);
    };

    mapPin.addEventListener('mousedown', onMapPinMousedown);

  };

  mapPin.addEventListener('mouseup', onMapPinMouseup);


})
();

