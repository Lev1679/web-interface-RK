function addIP_localstorage() {
    const printerIPTextbox = document.getElementById('printerIPtextbox');
    const ip = printerIPTextbox.value;
    if (ip.trim() !== '') {
        const printers = JSON.parse(localStorage.getItem('printers')) || [];
        printers.push(ip);
        localStorage.setItem('printers', JSON.stringify(printers));
        printerIPTextbox.value = '';
    } else {
        alert('Введите IP адрес');
    }
}