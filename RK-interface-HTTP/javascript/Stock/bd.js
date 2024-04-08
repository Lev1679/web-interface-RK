// Добавляем обработчик события при нажатии на кнопку "Добавить на склад"
document.getElementById("addToInventoryBtn").addEventListener("click", function() {
  var plasticType = document.getElementById("plasticType").value;
  var quantity = document.getElementById("quantity").value;
  var price = document.getElementById("price").value;

  // Создаем объект для хранения данных о пластике
  var newItem = {
      id: Date.now(), // Генерируем уникальный ID на основе времени
      plasticType: plasticType,
      quantity: quantity,
      price: price
  };

  // Получаем текущий список товаров из LocalStorage
  var inventory = JSON.parse(localStorage.getItem('inventory')) || [];

  // Добавляем новый товар в список
  inventory.push(newItem);

  // Обновляем список товаров в LocalStorage
  localStorage.setItem('inventory', JSON.stringify(inventory));

  // Очищаем поля ввода
  document.getElementById("plasticType").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";

  // Обновляем отображение списка товаров
  updateInventoryDisplay();
});

// Функция для обновления отображения списка товаров
function updateInventoryDisplay() {
  var tableBody = document.getElementById("inventoryTableBody");
  tableBody.innerHTML = ""; // Очищаем текущее содержимое таблицы

  // Получаем текущий список товаров из LocalStorage
  var inventory = JSON.parse(localStorage.getItem('inventory')) || [];

  // Проходим по каждому товару в списке и добавляем его в таблицу
  inventory.forEach(function(item) {
      var row = tableBody.insertRow();
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4); // Добавляем ячейку для кнопки "Удалить"
      cell0.textContent = item.id; // Отображаем ID товара
      cell1.textContent = item.plasticType;
      cell2.textContent = item.quantity;
      cell3.textContent = item.price;
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", function() {
          // Удаляем товар из списка в LocalStorage
          inventory = inventory.filter(function (el) {
              return el.id !== item.id; // Фильтруем товары по ID
          });
          localStorage.setItem('inventory', JSON.stringify(inventory));
          // Удаляем строку из таблицы
          tableBody.removeChild(row);
      });
      cell4.appendChild(deleteButton);
  });
}

// При загрузке страницы обновляем отображение списка товаров
window.addEventListener('load', function() {
  updateInventoryDisplay();
});