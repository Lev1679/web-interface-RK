function sendRequestTemperature() {
    var url = 'http://192.168.5.7:7125/printer/objects/query?extruder';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var temperature = response.result.status.extruder.temperature;
                document.getElementById('response').textContent = 'Текущая температура экструдера: ' + temperature + '°C';
            } else {
                document.getElementById('response').textContent = 'Ошибка: Невозможно получить данные о принтере';
            }
        }
    };

    xhr.onerror = function () {
        document.getElementById('response').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
    };

    xhr.send();
}

function sendRequestHeaterBed() {
    var url = 'http://192.168.5.7:7125/printer/objects/query?heater_bed';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var temperature = response.result.status.heater_bed.temperature;
                document.getElementById('response2').textContent = 'Текущая температура платформы: ' + temperature + '°C';
            } else {
                document.getElementById('response2').textContent = 'Ошибка: Невозможно получить данные о принтере';
            }
        }
    };

    xhr.onerror = function () {
        document.getElementById('response2').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
    };

    xhr.send();
}

sendRequestTemperature();
sendRequestHeaterBed();
setInterval(sendRequestTemperature, 3000);
setInterval(sendRequestHeaterBed, 3000);