// Создаем сцену
const scene = new THREE.Scene();

// Создаем камеру
const aspectRatio = 1; // Соотношение сторон квадрата
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 5;

// Создаем рендерер
const renderer = new THREE.WebGLRenderer();
const size = Math.min(window.innerWidth, window.innerHeight);
renderer.setSize(size, size);
document.getElementById('container').appendChild(renderer.domElement);

// Создаем геометрию для куба
const cubeGeometry = new THREE.BoxGeometry();
// Создаем материал для куба (зеленый цвет)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Создаем меш для куба
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Создаем геометрию для пола (плоскость)
const floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
// Создаем материал для пола (белый цвет)
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
// Создаем меш для пола
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2; // Поворачиваем пол так, чтобы он был параллелен плоскости XZ
floor.position.y = -2; // Поднимаем пол ниже куба
scene.add(floor);

// Создаем освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Функция для загрузки и отображения 3D модели
function loadModel(file) {
    // Создаем загрузчик GLTF
    const loader = new THREE.GLTFLoader();
    // Загружаем модель из содержимого файла
    loader.load(
        file,
        function(gltf) {
            // Получаем меш из загруженной сцены
            const model = gltf.scene;
            // Добавляем загруженную модель на сцену
            scene.add(model);
        },
        function(xhr) {
            // Обработчик прогресса загрузки
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        function(error) {
            // Обработчик ошибок загрузки
            console.error('Произошла ошибка загрузки 3D модели:', error);
        }
    );
}

// Получаем ссылку на кнопку
const fileInput = document.getElementById('fileInput');

// Добавляем обработчик события для нажатия на кнопку
fileInput.addEventListener('click', function() {
    // Открываем диалоговое окно для выбора файла
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gltf, .glb'; // Разрешаем загружать файлы с расширениями .gltf и .glb

    // Обработчик изменения выбранного файла
    input.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Получаем первый выбранный файл
        if (file) {
            // Загружаем и отображаем 3D модель
            loadModel(URL.createObjectURL(file));
        }
    });

    // Триггерим клик по инпуту чтобы открыть диалоговое окно
    input.click();
});

// Функция анимации
function animate() {
    requestAnimationFrame(animate);

    // Вращаем куб
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
