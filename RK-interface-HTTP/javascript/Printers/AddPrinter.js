var clickCount = 0;

function addPrinter() {
    var printerContainer = document.createElement("div");
    printerContainer.classList.add("printer-container");

    var printerImage = document.createElement("img");
    printerImage.classList.add("printer-image");
    printerImage.src = "images/printer_list/printer_bg.png";
    printerImage.alt = "Printer Background";

    var textOverlay = document.createElement("div");
    textOverlay.classList.add("text-overlay");
    textOverlay.classList.add("left-align");

    // Получаем индекс картинки по клику
    var index = clickCount % 4; // Поскольку каждые 4 нажатия добавляем в новую строку, остаток от деления на 4 даст нам индекс текущей картинки

    // Получаем текст из localStorage по индексу
    var printers = JSON.parse(localStorage.getItem('printers')) || [];
    var printerIP = printers[index]; // IP адрес принтера
    var printerText = printerIP;

    // Устанавливаем текст на текстовом оверлее
    textOverlay.textContent = printerText;

    // Добавляем изображение и текст в контейнер
    printerContainer.appendChild(printerImage);
    printerContainer.appendChild(textOverlay);

    // Создаем контейнер для вывода информации о принтере
    var printerInfoContainer = document.createElement("div");
    printerInfoContainer.classList.add("printer-info");
    printerContainer.appendChild(printerInfoContainer);

    // Выполняем запрос к принтеру и выводим информацию в контейнер
    makeRequestAndUpdatePrinterInfo(printerIP, printerInfoContainer);

    // Создаем кнопку удаления
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("delete-button");

    // Добавляем обработчик события для удаления принтера при нажатии на кнопку
    deleteButton.addEventListener("click", function () {
        // Удаляем принтер из DOM
        printerContainer.remove();

        // Удаляем принтер из localStorage
        printers.splice(index, 1);
        localStorage.setItem('printers', JSON.stringify(printers));

        // Перемещаем кнопку добавления принтера
        updateAddButtonPosition();
    });

    // Добавляем кнопку удаления в контейнер
    printerContainer.appendChild(deleteButton);

    // Создаем кнопку Fluid
    var fluidButton = document.createElement("a");
    fluidButton.textContent = "F";
    fluidButton.classList.add("Fluid-button");

    // Устанавливаем ссылку на соответствующий принтер
    fluidButton.href = "http://" + printerIP;

    // Добавляем кнопку Fluid в контейнер
    printerContainer.appendChild(fluidButton);

    // Определяем, в какой ряд добавить контейнер
    var rowNumber = Math.floor(clickCount / 4) + 1; // Каждые 4 нажатия добавляем в новую строку
    var rowElement = document.querySelector('.row-' + rowNumber);
    if (!rowElement) {
        // Создаем новый ряд, если он не существует
        rowElement = document.createElement('div');
        rowElement.classList.add('row-' + rowNumber);
        rowElement.style.clear = 'both'; // Чтобы контейнеры не перекрывали друг друга
        document.body.appendChild(rowElement);
    }

    // Добавляем контейнер на страницу в нужный ряд
    rowElement.appendChild(printerContainer);

    // Увеличиваем счетчик
    clickCount++;

    // Перемещаем кнопку добавления принтера
    updateAddButtonPosition();
}

function makeRequestAndUpdatePrinterInfo(printerIP, printerInfoContainer) {
    var urls = [
        'http://' + printerIP + ':7125/printer/objects/query?extruder',
        'http://' + printerIP + ':7125/printer/objects/query?heater_bed',
        'http://' + printerIP + ':7125/printer/objects/query?print_stats'
    ];

    var temperatureElement = document.createElement("div");
    temperatureElement.classList.add("temperature-info"); // Добавляем класс для "Э"
    printerInfoContainer.appendChild(temperatureElement);

    var bedTemperatureElement = document.createElement("div");
    bedTemperatureElement.classList.add("bed-temperature-info"); // Добавляем класс для "П"
    printerInfoContainer.appendChild(bedTemperatureElement);

    var printerStatsElement = document.createElement("div");
    printerStatsElement.classList.add("printer-stats");
    printerInfoContainer.appendChild(printerStatsElement);

    function updateInfo() {
        urls.forEach(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        var text;

                        if (url.includes('extruder')) {
                            var temperature = response.result.status.extruder.temperature;
                            temperatureElement.textContent = 'Э: ' + temperature + '°C';
                        } else if (url.includes('heater_bed')) {
                            var bedTemperature = response.result.status.heater_bed.temperature;
                            bedTemperatureElement.textContent = 'П: ' + bedTemperature + '°C';
                        } else if (url.includes('print_stats')) {
                            var filename = response.result.status.print_stats.filename;
                            var totalDuration = response.result.status.print_stats.total_duration;
                            var printDuration = response.result.status.print_stats.print_duration;
                            var state = response.result.status.print_stats.state;

                            printerStatsElement.textContent = '';

                            var filenameElement = document.createElement("div");
                            filenameElement.textContent = 'Файл: ' + filename;
                            printerStatsElement.appendChild(filenameElement);

                            var totalDurationElement = document.createElement("div");
                            totalDurationElement.textContent = 'Общ. Длительность: ' + totalDuration + ' сек';
                            printerStatsElement.appendChild(totalDurationElement);

                            var printDurationElement = document.createElement("div");
                            printDurationElement.classList.add("PrintDuration");
                            printDurationElement.textContent = 'Длительность печати: ' + printDuration + ' сек';
                            printerStatsElement.appendChild(printDurationElement);

                            var stateElement = document.createElement("div");
                            stateElement.classList.add("state-info");
                            stateElement.textContent = 'Статус: ' + state;
                            printerStatsElement.appendChild(stateElement);
                        }
                    } else {
                        console.error('Ошибка запроса из: ' + url + ': ' + xhr.statusText);
                    }
                }
            };

            xhr.onerror = function () {
                console.error('Error occurred while sending request to ' + url);
            };

            xhr.send();
        });
    }

    updateInfo();
    setInterval(updateInfo, 3000);
}




// Функция для обновления позиции кнопки добавления принтера
function updateAddButtonPosition() {
    // Получаем текущее количество рядов
    var rowCount = Math.ceil(clickCount / 4);

    // Получаем последний контейнер в последнем ряду
    var lastRowContainers = document.querySelectorAll('.row-' + rowCount + ' .printer-container');
    var lastContainer = lastRowContainers[lastRowContainers.length - 1];

    // Если в текущем ряду уже 4 принтера, переходим на новую строку
    if (lastRowContainers.length >= 4) {
        rowCount++;
        lastContainer = null; // Сбрасываем последний контейнер, чтобы новый контейнер был добавлен на новой строке
    }

    // Если нет последнего контейнера (например, если нужно начать новую строку)
    if (!lastContainer) {
        // Создаем новый ряд
        var rowElement = document.createElement('div');
        rowElement.classList.add('row-' + rowCount);
        rowElement.style.clear = 'both'; // Чтобы контейнеры не перекрывали друг друга
        document.body.appendChild(rowElement);

        // Получаем позицию кнопки добавления принтера
        var addButton = document.getElementById('addIPPrinterBtn');
        var addButtonPosition = addButton.getBoundingClientRect();

        // Позиционируем кнопку добавления принтера на новой строке
        addButton.style.position = 'absolute';
        addButton.style.left = '90px';
        addButton.style.top = (addButtonPosition.bottom + 20) + 'px';
    } else {
        // Получаем позицию последнего контейнера
        var lastContainerPosition = lastContainer.getBoundingClientRect();

        // Позиционируем кнопку добавления принтера на текущей строке
        var addButton = document.getElementById('addIPPrinterBtn');
        addButton.style.position = 'absolute';
        addButton.style.left = (lastContainerPosition.right + 20) + 'px';
    }
}

// Функция для загрузки принтеров из localStorage
function loadPrintersFromLocalStorage() {
    // Получаем количество принтеров из localStorage
    var printers = JSON.parse(localStorage.getItem('printers')) || [];
    var numOfPrinters = printers.length;

    // Вызываем функцию addPrinter() для каждого принтера
    for (var i = 0; i < numOfPrinters; i++) {
        addPrinter();
    }

    // Перемещаем кнопку добавления принтера после загрузки принтеров
    updateAddButtonPosition();
}

// Загрузка принтеров из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', loadPrintersFromLocalStorage);
