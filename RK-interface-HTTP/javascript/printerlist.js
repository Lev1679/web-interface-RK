function ClickFunction() {
    var urls = [
      'http://192.168.5.7:7125/printer/objects/query?extruder',
      'http://192.168.5.7:7125/printer/objects/query?heater_bed'
    ];
  
    urls.forEach(function(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
  
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  var response = JSON.parse(xhr.responseText);
                  var temperature = response.result.status[url.includes('extruder') ? 'extruder' : 'heater_bed'].temperature;
                  document.getElementById(url.includes('extruder') ? 'response' : 'response2').textContent = 'Текущая температура экструдера/платформы: ' + temperature + '°C';
              } else {
                  document.getElementById(url.includes('extruder') ? 'response' : 'response2').textContent = 'Ошибка: Невозможно получить данные о принтере';
              }
          }
      };
  
      xhr.onerror = function () {
          document.getElementById(url.includes('extruder') ? 'response' : 'response2').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
      };
  
      xhr.send();
    });
  }
  
  setInterval(ClickFunction, 3000);
  
  ClickFunction();