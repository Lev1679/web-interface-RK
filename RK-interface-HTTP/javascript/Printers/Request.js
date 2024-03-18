function RequestFunc() {
    var urls = [
        'http://192.168.5.7:7125/printer/objects/query?extruder',
        'http://192.168.5.7:7125/printer/objects/query?heater_bed'
    ];

    urls.forEach(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var temperature;

                    // Проверяем, для какого устройства получен ответ
                    if (url.includes('extruder')) {
                        temperature = response.result.status.extruder.temperature;
                        document.getElementById('response').textContent = 'Текущая температура экструдера: ' + temperature + '°C';
                    } else if (url.includes('heater_bed')) {
                        temperature = response.result.status.heater_bed.temperature;
                        document.getElementById('response2').textContent = 'Текущая температура платформы: ' + temperature + '°C';
                    }
                } else {
                    // Обрабатываем ошибку
                    if (url.includes('extruder')) {
                        document.getElementById('response').textContent = 'Ошибка: Невозможно получить данные о принтере';
                    } else if (url.includes('heater_bed')) {
                        document.getElementById('response2').textContent = 'Ошибка: Невозможно получить данные о принтере';
                    }
                }
            }
        };

        xhr.onerror = function () {
            // Обрабатываем ошибку при выполнении запроса
            if (url.includes('extruder')) {
                document.getElementById('response').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
                document.getElementById('response').classList.remove('hidden');
            } else if (url.includes('heater_bed')) {
                document.getElementById('response2').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
                document.getElementById('response2').classList.remove('hidden');
            }
        };

        xhr.send();
    });
}

setInterval(RequestFunc, 3000);

RequestFunc();
