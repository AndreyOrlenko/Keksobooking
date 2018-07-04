'use strict';

(function () {

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            onError('Неизвестный статус ' + xhr.status + '' + xhr.statusText);
        }

      });
      xhr.addEventListener('error', function () {
        console.log(onError('Произошла ошибка соединения'));
      });

      xhr.addEventListener('timeout', function () {
        console.log(onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс'));
      });
      xhr.timeout = 10000;

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            onError('Неизвестный статус ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        console.log(onError('Произошла ошибка соединения'));
      });

      xhr.addEventListener('timeout', function () {
        console.log(onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс'));
      });
      xhr.timeout = 10000;

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    },
    onError: function (message) {
      var errorElement = document.createElement('div');
      errorElement.style.color = 'white';
      errorElement.style.zIndex = '1000';
      errorElement.style.boxSizing = 'border-box';
      errorElement.style.position = 'fixed';
      errorElement.style.left = '50%';
      errorElement.style.top = '50%';
      errorElement.style.width = '500px';
      errorElement.style.height = '300px';
      errorElement.style.marginLeft = '-250px';
      errorElement.style.marginTop = '-150px';
      errorElement.style.padding = '100px 30px 0 30px';
      errorElement.style.backgroundColor = 'red';
      errorElement.style.textAlign = 'center';
      errorElement.style.fontSize = '35px';
      errorElement.style.borderRadius = '25px';
      errorElement.style.boxShadow = '0 0 100px 10px rgba(0, 0, 0, 1)';
      errorElement.textContent = message;

      document.body.insertAdjacentElement('afterbegin', errorElement);
      console.error(message);
    },
    onLoad: function (data) {
      console.log(data);

    }
  };

})();
