function RequestFunc() {
    var urls = [
        'http://192.168.5.11:7125/printer/objects/query?extruder',
        'http://192.168.5.11:7125/printer/objects/query?heater_bed',
        'http://192.168.5.11:7125/printer/objects/query?print_stats'
    ];

    urls.forEach(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var data;

                    // Проверяем, для какого устройства получен ответ
                    if (url.includes('extruder')) {
                        var temperature = response.result.status.extruder.temperature;
                        document.getElementById('response').textContent = 'Э: ' + temperature + '°C';
                    } else if (url.includes('heater_bed')) {
                        var temperature = response.result.status.heater_bed.temperature;
                        document.getElementById('response2').textContent = 'П: ' + temperature + '°C';
                    } else if (url.includes('print_stats')) {
                        var filename = response.result.status.print_stats.filename;
                        var totalDuration = response.result.status.print_stats.total_duration;
                        var printDuration = response.result.status.print_stats.print_duration;
                        var state = response.result.status.print_stats.state;

                        document.getElementById('response3').textContent = 'Файл: ' + filename;
                        document.getElementById('response4').textContent = 'Общ. Длительность: ' + totalDuration + ' сек';
                        document.getElementById('response5').textContent = 'Длительность печати: ' + printDuration + ' сек';
                        document.getElementById('response6').textContent = 'Статус: ' + state;
                    }
                } else {
                    // Обрабатываем ошибку
                    if (url.includes('extruder')) {
                        document.getElementById('response').textContent = 'Ошибка: Невозможно получить данные о принтере';
                    } else if (url.includes('heater_bed')) {
                        document.getElementById('response2').textContent = 'Ошибка: Невозможно получить данные о принтере';
                    } else if (url.includes('print_stats')) {
                        document.getElementById('response3').textContent = 'Ошибка: Невозможно получить данные о печати';
                        document.getElementById('response4').textContent = '';
                        document.getElementById('response5').textContent = '';
                        document.getElementById('response6').textContent = '';
                    }
                }
            }
        };

        xhr.onerror = function () {
            // Обрабатываем ошибку при выполнении запроса
            if (url.includes('extruder')) {
                document.getElementById('response').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
            } else if (url.includes('heater_bed')) {
                document.getElementById('response2').textContent = 'Ошибка: Невозможно выполнить запрос к принтеру';
            } else if (url.includes('print_stats')) {
                document.getElementById('response3').textContent = 'Ошибка: Невозможно выполнить запрос о состоянии печати';
                document.getElementById('response4').textContent = '';
                document.getElementById('response5').textContent = '';
                document.getElementById('response6').textContent = '';
            }
        };

        xhr.send();
    });
}

setInterval(RequestFunc, 3000);

RequestFunc();
