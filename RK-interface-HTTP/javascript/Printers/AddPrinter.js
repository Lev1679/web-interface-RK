var clickCount = 0;

function addPrinter() {
  // Создаем элементы контейнера
  var printerContainer = document.createElement("div");
  printerContainer.classList.add("printer-container");

  var printerImage = document.createElement("img");
  printerImage.classList.add("printer-image");
  printerImage.src = "images/printer_list/printer_bg.png";
  printerImage.alt = "Printer Background";

  var textOverlay = document.createElement("div");
  textOverlay.classList.add("text-overlay");
  textOverlay.textContent = "Текст на изображении";

  // Добавляем изображение и текст в контейнер
  printerContainer.appendChild(printerImage);
  printerContainer.appendChild(textOverlay);

  // Определяем, в какой ряд добавить контейнер
  var rowNumber = Math.floor(clickCount / 4) + 1; // Каждые 4 нажатия добавляем в новый ряд
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
  if (clickCount % 4 === 0) {
    // Если количество нажатий кратно 4, перемещаем кнопку на новую строку
    var newRowTop = rowElement.offsetTop + 600;
    document.getElementById('addPrinterBtn').style.position = 'absolute';
    document.getElementById('addPrinterBtn').style.left = '90px';
    document.getElementById('addPrinterBtn').style.top = newRowTop + 'px';
  } else {
    // Иначе перемещаем кнопку вправо
    var buttonPosition = document.getElementById('addPrinterBtn').getBoundingClientRect();
    document.getElementById('addPrinterBtn').style.position = 'absolute';
    document.getElementById('addPrinterBtn').style.left = (buttonPosition.right + 220) + 'px';
  }
}

addPrinter();