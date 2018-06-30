'use strict';

//Создание объектов жилищ
(function() {
  var map = document.querySelector('.map');
  window.getRandomNumberFromTo = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createHouses = function(number) {
    var counterForArray = 0;
    var counterToThree = 0;
    for (var i = 1; i <= number; i++) {
      var house = 'house' + i;
      var avatar = 'img/avatars/user0' + i + '.png';
      var title = window.paramsHousing.title[counterForArray];
      if (counterToThree > 2) {
        counterToThree = 0;
      }
      var type = window.paramsHousing.type[counterToThree];
      var check = window.paramsHousing.check[counterToThree];
      window[house] = new Housing(avatar, title, type, check);
      counterForArray++;
      counterToThree++;
    }
  };

  window.paramsHousing = {
    title: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    type: ['flat', 'house', 'bungalo'],
    check: ['12:00', '13:00', '14:00']
  };

  var Housing = function(avatar, title, type, check) {
    this.author = {
      avatar: avatar
    };
    this.location = {
      x: window.getRandomNumberFromTo(300, 900),
      y: window.getRandomNumberFromTo(200, 500)
    };
    this.offer = {
      title: title,
      address: [this.location.x, this.location.y].join(', '),
      price: window.getRandomNumberFromTo(1000, 1000000),
      type: type,
      rooms: window.getRandomNumberFromTo(1, 5),
      guests: window.getRandomNumberFromTo(1, 20),
      checkin: check,
      checkout: check,
      features: window.paramsHousing.features.slice(
        0,
        window.getRandomNumberFromTo(1, window.paramsHousing.features.length)
      ),
      description: '',
      photos: []
    };
  };

  createHouses(8);
  map.classList.remove('map--faded');
})();

//Создание меток - элементов DOM
(function() {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var pin = document.querySelector('template').content.querySelector('.map__pin');
  var card = document.querySelector('template').content.querySelector('.map__card');

  var delAllChildren = function(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var createFeatures = function(element, arr, destination) {
    for (var i = 0; i < arr.length; i++) {
      var copyOfElements = element.cloneNode(true);
      copyOfElements.classList.add('feature');
      copyOfElements.classList.add('feature--' + arr[i]);
      destination.appendChild(copyOfElements.cloneNode(true));
    }
  };

  var createNewPin = function(number, template) {
    var element = template.cloneNode(true);
    element.style.left = window['house' + number].location.x - 20 + 'px';
    element.style.top = window['house' + number].location.y - 62 + 'px';
    element.setAttribute('src', window['house' + number].author.avatar);
    return element;
  };

  var createNewCard = function(number, template) {
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
    delAllChildren(featuresParent);
    createFeatures(elementLi, features, featuresParent);

    element.querySelector('p:nth-of-type(5)').textContent = description;
    element.querySelector('.popup__avatar').setAttribute('src', avatar);
    return element;
  };

  var renderElements = function(quantity, createFunction, template, finalDestination) {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i <= quantity; i++) {
      fragment.appendChild(createFunction(i, template));
    }
    finalDestination.appendChild(fragment);
  };

  renderElements(8, createNewPin, pin, mapPins);
  renderElements(8, createNewCard, card, map);
})();
