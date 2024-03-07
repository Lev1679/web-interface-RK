// Ваш JavaScript файл (назовем его calculator.js)

function calculator() {
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var infill = parseFloat(document.getElementById("infill").value) / 100;
    var material = document.getElementById("material").value;
    var priceUser = parseFloat(document.getElementById("priceUser").value);
    var costPrice = parseFloat(document.getElementById("costPrice").value);

    var volume = length * width * height / 1000;
    var plasticCost = volume * infill * costPrice;
    var userCost = volume * infill * priceUser;
    var profit = userCost - plasticCost;

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Результаты расчета:</h2>" +
        "<p>Объем: " + volume.toFixed(2) + " кг</p>" +
        "<p>Себестоимость пластика: " + plasticCost.toFixed(2) + " руб</p>" +
        "<p>Цена пластика для пользователя: " + userCost.toFixed(2) + " руб</p>" +
        "<p>Прибыль: " + profit.toFixed(2) + " руб</p>";
}
