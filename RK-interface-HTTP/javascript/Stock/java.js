// Функция для обновления количества пластика
function updateQuantity() {
    var plasticType = document.getElementById("plasticType").value;
    var quantityInput = document.getElementById("quantity");
    var quantity = parseInt(quantityInput.value);

    if (!isNaN(quantity) && quantity >= 0) {
        var currentQuantity = parseInt(document.getElementById(plasticType).textContent);
        var newQuantity = currentQuantity + quantity;
        document.getElementById(plasticType).textContent = newQuantity;
        quantityInput.value = 0; // Сбросить значение ввода
    } else {
        alert("Пожалуйста, введите корректное количество.");
    }
}

function addNewPlastic() {
    var newPlasticName = document.getElementById("newPlasticName").value;

    if (newPlasticName.trim() !== "") {
        var plasticTable = document.getElementById("plasticTable");
        var newRow = plasticTable.insertRow(plasticTable.rows.length - 1); // Вставить перед последней строкой

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);

        cell1.textContent = newPlasticName;
        cell2.textContent = "0";

        // Добавить новый вариант в выпадающий список
        var plasticTypeSelect = document.getElementById("plasticType");
        var option = document.createElement("option");
        option.text = newPlasticName;
        option.value = newPlasticName;
        plasticTypeSelect.add(option);

        // Очистить поле ввода
        document.getElementById("newPlasticName").value = "";

        // Обновить данные в LocalStorage
        saveDataToLocalStorage();
    } else {
        alert("Пожалуйста, введите название пластика.");
    }
}

// Функция для загрузки данных из localStorage при загрузке страницы
window.onload = function () {
    loadDataFromLocalStorage();
};

// Функция для загрузки данных из localStorage
function loadDataFromLocalStorage() {
    var plasticDataString = localStorage.getItem('plasticData');
    if (plasticDataString) {
        var plasticData = JSON.parse(plasticDataString);
        document.getElementById("plasticA").textContent = plasticData.plasticA;
        document.getElementById("plasticB").textContent = plasticData.plasticB;
        // Загрузите дополнительные виды пластика по необходимости
    }
}

// Функция для сохранения данных в localStorage
function saveDataToLocalStorage() {
    var plasticData = {
        plasticA: document.getElementById("plasticA").textContent,
        plasticB: document.getElementById("plasticB").textContent
        // Добавьте дополнительные виды пластика по необходимости
    };
    localStorage.setItem('plasticData', JSON.stringify(plasticData));
}

// Загрузка данных с сервера (пример)
fetch('/plastic-prices')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#plasticPricesTable tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.plastic_type}</td>
                <td>${row.price_per_kg}</td>
                <td>${row.quantity}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Ошибка:', error));
