function calculator() {
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var infill = parseFloat(document.getElementById("infill").value);
    var material = document.getElementById("material").value; // Получаем выбранный тип пластика

    // Рассчеты на основе выбранного пластика
    var density;
    if (material === "pla") {
        density = 1.24; // Пример плотности PLA в г/см^3
    } else if (material === "abs") {
        density = 1.04; // Пример плотности ABS в г/см^3
    } else if (material === "petg") {
        density = 1.27; // Пример плотности PETG в г/см^3
    }

    var volume = length * width * height; // Объем модели
    var plasticUsed = (volume * (infill / 100) * density).toFixed(2); // Расход пластика

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Для печати этой модели понадобится " + plasticUsed + " кубических сантиметров пластика.";
}
