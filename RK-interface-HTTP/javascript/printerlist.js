document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'c326c12042de41bfa7ca92905d2b32ff';
    const apiUrl = 'http://127.0.0.1:7125/printer/objects/query?extruder'; // обновите этот URL

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const extruderTemperature = response.temperature || 'Не найдено';

                document.getElementById('extruderTemperatureDisplay').innerText = `Температура экструдера: ${extruderTemperature}`;
            } else {
                console.error(`Ошибка при запросе: ${xhr.status}`);
            }
        }
    };

    xhr.open('GET', apiUrl, true);
    xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhr.send();
});

// Мы пытались через Javascript, но ничего не получилось