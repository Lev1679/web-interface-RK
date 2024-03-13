// Создаем сцену
const scene = new THREE.Scene();

// Настраиваем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Создаем рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создаем и добавляем освещение
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// Функция загрузки 3D модели
function loadModel(file) {
    const loader = new THREE.GLTFLoader();
    loader.load(URL.createObjectURL(file), function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error('Loading failed:', error);
        document.getElementById('loadingMessage').style.display = 'block';
    });
}

// Обработчик нажатия на кнопку загрузки модели
document.getElementById('loadButton').addEventListener('click', function () {
    const fileInput = document.getElementById('modelFile');
    if (fileInput.files.length > 0) {
        loadModel(fileInput.files[0]);
        document.getElementById('loadingMessage').style.display = 'none';
    } else {
        console.error('No file selected for loading.');
        document.getElementById('loadingMessage').style.display = 'block';
    }
});

// Обработчик изменения размеров окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
