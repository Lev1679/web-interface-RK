function calculateCostAndPrice() {
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);
    var density = parseFloat(document.getElementById('density').value);
    var pricePerKg = parseFloat(document.getElementById('pricePerKg').value);
    var materialCost = parseFloat(document.getElementById('materialCost').value);
    var laborCost = parseFloat(document.getElementById('laborCost').value);
    var desiredProfit = parseFloat(document.getElementById('desiredProfit').value);

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(density) || isNaN(pricePerKg) || isNaN(materialCost) || isNaN(laborCost) || isNaN(desiredProfit)) {
        document.getElementById('status').innerText = "Ошибка: Пожалуйста, введите числовые значения во все поля.";
        return;
    }

    var volume = length * width * height;
    var plasticWeight = volume * density / 1000;
    var totalPlasticCost = plasticWeight * pricePerKg;
    var totalCost = totalPlasticCost + materialCost + laborCost;
    var profitPercentage = 1 + desiredProfit / 100;
    var sellingPrice = totalCost * profitPercentage;

    document.getElementById('result').innerHTML = "Себестоимость модели: " + totalCost.toFixed(2) + " рублей<br>" +
        "Цена для продажи: " + sellingPrice.toFixed(2) + " рублей";
    document.getElementById('status').innerText = "Выполнено: Расчет завершен успешно.";
}
