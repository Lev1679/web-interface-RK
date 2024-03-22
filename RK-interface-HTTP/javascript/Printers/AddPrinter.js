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
    textOverlay.classList.add("left-align");

    // Устанавливаем текст из переменных response и response2
    textOverlay.innerHTML = document.getElementById('response').textContent + '<br>' + document.getElementById('response2').textContent + '<br>' + document.getElementById('response3').textContent + '<br>' + document.getElementById('response4').textContent + '<br>' + document.getElementById('response5').textContent + '<br>' + document.getElementById('response6').textContent;

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
        document.getElementById('addIPPrinterBtn').style.position = 'absolute';
        document.getElementById('addIPPrinterBtn').style.left = '90px';
        document.getElementById('addIPPrinterBtn').style.top = newRowTop + 'px';
    } else {
        // Иначе перемещаем кнопку вправо
        var buttonPosition = document.getElementById('addIPPrinterBtn').getBoundingClientRect();
        document.getElementById('addIPPrinterBtn').style.position = 'absolute';
        document.getElementById('addIPPrinterBtn').style.left = (buttonPosition.right + 220) + 'px';
    }
}

addPrinter();

setInterval(function() {
  var textOverlays = document.querySelectorAll('.text-overlay');
  textOverlays.forEach(function(overlay) {
      var response1 = document.getElementById('response').textContent;
      var response2 = document.getElementById('response2').textContent;
      var response3 = document.getElementById('response3').textContent;
      var response4 = document.getElementById('response4').textContent;
      var response5 = document.getElementById('response5').textContent;
      var response6 = document.getElementById('response6').textContent;

      overlay.innerHTML = response1 + '<br>' + response2 + '<br>' + response3 + '<br>' + response4 + '<br>' + response5 + '<br>' + response6;
  });
}, 3000);