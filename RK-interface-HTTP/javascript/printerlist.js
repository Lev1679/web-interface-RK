document.addEventListener('DOMContentLoaded', () => {
    // Здесь мы используем XMLHttpRequest для получения содержимого страницы
    const url = 'http://192.168.5.7/#/';
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Парсим HTML-страницу и извлекаем данные о температуре
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhr.responseText, 'text/html');
  
        const tempActualElement = doc.getElementById('tempActual'); // Замените 'tempActual' на реальный идентификатор элемента
        const heaterBedElement = doc.getElementById('heaterBed'); // Замените 'heaterBed' на реальный идентификатор элемента
  
        // Получаем значения температур и обновляем элементы на странице
        const tempActual = tempActualElement ? tempActualElement.innerText : 'Не найдено';
        const heaterBed = heaterBedElement ? heaterBedElement.innerText : 'Не найдено';
  
        document.getElementById('tempActualDisplay').innerText = `Температура: ${tempActual}`;
        document.getElementById('heaterBedDisplay').innerText = `Температура heated bed: ${heaterBed}`;
      }
    };
  
    xhr.open('GET', url, true);
    xhr.send();
  });