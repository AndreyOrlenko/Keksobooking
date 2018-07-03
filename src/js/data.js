'use strict';

(function () {

  window.getRandomNumberFromTo = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createHouses = function (number) {
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

  var Housing = function (avatar, title, type, check) {
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

})();
